import React,{Component} from 'react';
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import Image from "../Image";
import CollageButtons from "../../components/CollageButtons";
import Form from "../../components/Form";
import Carousel from "../../components/Carousel";
import ExpandedImage from "../ExpandedImage";
import { setQueryAction } from "../../redux/actions/query";
import {addImageToFavoritesAction, removeImageFromFavoritesAction} from '../../redux/actions/favorites';
import {addToSearchHistoryAction, clearSearchHistoryAction} from "../../redux/actions/searchHistory";
import {accessKey} from "../../constants/other";
import '../../styles/style.css'

class LandingNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchedImages: [],
            page: 1,
            rowOrGrid: false //row false, grid true
        };
        this.linkToQuery = React.createRef();
        this.fetchImages = this.fetchImages.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleExpandImage = this.handleExpandImage.bind(this);
        this.handleCompressImage = this.handleCompressImage.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClickCarousel = this.handleClickCarousel.bind(this);
        this.handleClickCollageButton = this.handleClickCollageButton.bind(this);
    }

    componentDidMount() {
        this.fetchImages();
    }

    //FORM
    handleFormSubmit() {
        this.linkToQuery.current && this.linkToQuery.current.click();
    }

    handleInputChange(event) {
        this.props.setQueryFunction(event.target.value);
    }

    //CAROUSEL
    handleClickCarousel(event) {
        this.props.setQueryFunction(event.target.textContent);
        this.handleFormSubmit();
    }

    //IMAGE
    handleExpandImage(data) {
        const images = this.state.fetchedImages;
        images[0].expand = false;
        data.expand = true;
        images.splice(images.indexOf(data), 1);
        this.setState({
            fetchedImages: [data, ...images]
        });
        document.querySelector(".footer").click();
    }

    handleCompressImage(data) {
        data.expand = false;
        this.setState({
            fetchedImages: [...this.state.fetchedImages]
        });
    }

    fetchImages() {
        axios
            .get(
                `https://api.unsplash.com/photos/?page=${this.state.page}&per_page=30&client_id=${accessKey}`
            )
            .then (res => {
                this.setState({
                    page: ++this.state.page,
                    fetchedImages: [...this.state.fetchedImages, ...res.data]
                });
            })
            .catch(err => {
                this.fetchImages();
            });
    }

    //CollageButton
    handleClickCollageButton(button) {
        if(button) {
            this.setState({
                rowOrGrid: true
            })
        } else {
            this.setState({
                rowOrGrid: false
            })
        }
    }

    render() {
        return (
            <>
                <Form
                    inputValue={this.props.query}
                    onInputChange={this.handleInputChange}
                    onFormSubmit={this.handleFormSubmit}/>

                <Carousel onClick={this.handleClickCarousel}/>

                <CollageButtons onButtonClick={this.handleClickCollageButton}/>

                <InfiniteScroll
                    dataLength={this.state.fetchedImages}
                    next={() => this.fetchImages()}
                    hasMore={true}
                    loader={<img src={require("../../gifs/loading.gif")} alt="loading gif" className="loading-gif"/>}
                >
                    <div className={`collage ${this.state.rowOrGrid ? "collage_grid" : "collage_row"}`}>
                        {
                            this.state.fetchedImages.map(image => image.expand ? (
                                <ExpandedImage
                                    data={image}
                                    url={image.urls.regular}
                                    key={image.id}
                                    handleCompressImage={this.handleCompressImage}
                                    favorites={this.props.favorites}
                                    addImageToFavorites={this.props.addImageToFavoritesFunction}
                                    removeImageFromFavorites={this.props.removeImageFromFavoritesFunction}/>
                                ) : (
                                <Image
                                    data={image}
                                    url={image.urls.regular}
                                    key={image.id}
                                    handleExpandImage={this.handleExpandImage}
                                    favorites={this.props.favorites}
                                    addImageToFavorites={this.props.addImageToFavoritesFunction}
                                    removeImageFromFavorites={this.props.removeImageFromFavoritesFunction}/>
                                )
                            )
                        }
                    </div>
                </InfiniteScroll>

                <Link to="/photos/"
                      className="linkToQuery"
                      ref={this.linkToQuery}/>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        query: state.query,
        favorites: state.favorites,
        searchHistory: state.searchHistory
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setQueryFunction: query => {
            dispatch(setQueryAction(query))
        },
        addImageToFavoritesFunction: image => {
            dispatch(addImageToFavoritesAction(image))
        },
        removeImageFromFavoritesFunction: image => {
            dispatch(removeImageFromFavoritesAction(image))
        },
        addToSearchHistoryFunction: query => {
            dispatch(addToSearchHistoryAction(query))
        },
        clearSearchHistoryFunction: () => {
            dispatch(clearSearchHistoryAction())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LandingNew);
