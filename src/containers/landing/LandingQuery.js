import React, {Component} from 'react';
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios';
import {addImageToFavoritesAction, removeImageFromFavoritesAction} from '../../redux/actions/favorites';
import {addToSearchHistoryAction, clearSearchHistoryAction} from '../../redux/actions/searchHistory';
import {setQueryAction} from "../../redux/actions/query";
import Carousel from "../../components/Carousel";
import Form from "../../components/Form";
import CollageButtons from "../../components/CollageButtons";
import ImageNotFound from "../../components/ImageNotFound";
import Image from "../../containers/Image";
import ExpandedImage from "../ExpandedImage";
import {accessKey} from "../../constants/other";
import '../../styles/style.css';

class LandingQuery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchedImages: [],
            page: 1,
        }
        this.fetchImages = this.fetchImages.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClickCarousel = this.handleClickCarousel.bind(this);
        this.handleExpandImage = this.handleExpandImage.bind(this);
        this.handleCompressImage = this.handleCompressImage.bind(this);
    }

    componentDidMount() {
        this.handleFormSubmit();
    }

    //FORM
    handleInputChange(event) {
        this.props.setQueryFunction(event.target.value);
    }

    handleFormSubmit() {
        const {searchHistory, query} = this.props;
        axios
            .get(`https://api.unsplash.com/search/photos/?page=1&per_page=30&query=${query}&client_id=${accessKey}`)
            .then (res => {
                if (searchHistory.length > 0 && searchHistory[searchHistory.length - 1] !== query) {
                    this.setState({
                        page: 2,
                        fetchedImages: [...res.data.results]
                    });
                } else {
                    this.setState({
                        page: 2,
                        fetchedImages: [...this.state.fetchedImages, ...res.data.results]
                    });
                }
                this.props.addToSearchHistoryFunction(query);
            })
            .catch(err => {
                this.handleFormSubmit();
            });
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
                `https://api.unsplash.com/search/photos/?page=${this.state.page}&per_page=10&query=${this.props.query}&client_id=${accessKey}`
            )
            .then (res => {
                this.setState({
                    page: ++this.state.page,
                    fetchedImages: [...this.state.fetchedImages, ...res.data.results]
                });
            })
            .catch(err => {
                this.fetchImages();
            });
    }

    render() {
        return (
             <>
                 <Form
                     inputValue={this.props.query}
                     onInputChange={this.handleInputChange}
                     onFormSubmit={this.handleFormSubmit}/>

                 <Carousel onClick={this.handleClickCarousel}/>

                 <CollageButtons/>

                 <InfiniteScroll
                     dataLength={this.state.fetchedImages}
                     next={() => this.fetchImages()}
                     hasMore={true}
                     loader={<img src={require("../../gifs/loading.gif")} alt="loading gif" className="loading-gif"/>}
                 >
                     <div className="collage">
                         {
                             this.state.fetchedImages.length > 1 ? (
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
                             ) : <ImageNotFound/>
                         }
                     </div>
                 </InfiniteScroll>
             </>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(LandingQuery);
