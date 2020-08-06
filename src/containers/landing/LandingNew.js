import React,{Component} from 'react';
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import {addImageToFavoritesAction, removeImageFromFavoritesAction} from '../../actions/favorites';
import { setQueryAction } from "../../actions/query";
import Image from "../Image";
import CollageButtons from "../../components/CollageButtons";
import Form from "../../components/Form";
import Carousel from "../../components/Carousel";
import ExpandedImage from "../ExpandedImage";
import SearchHistory from "../../components/SearchHistory";
import '../../styles/style.css'
import {addToSearchHistoryAction, clearSearchHistoryAction} from "../../actions/searchHistory";
import {accessKey} from "../../constants/other";

class LandingNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            downloadedImages: [],
            showSearchOrHistory: true, //true show search, false show history
            pageNumber: 1,
        };
        this.linkToQuery = React.createRef();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.fetchImages = this.fetchImages.bind(this);
        this.handleExpand = this.handleExpand.bind(this);
        this.handleCompress = this.handleCompress.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClickCarousel = this.handleClickCarousel.bind(this);
    }

    componentDidMount() {
        this.fetchImages();
    }

    handleFormSubmit() {
        this.linkToQuery.current.click();
    }

    handleInputChange(event) {
        this.props.setQueryFunction(event.target.value);
    }

    handleClickCarousel(query) {
        this.props.setQueryFunction(query);
        this.handleFormSubmit();
    }

    handleExpand(data) {
        data.expand = true;
        const rest = this.state.downloadedImages;
        rest.splice(rest.indexOf(data), 1);
        //esli 1 tozhe expand udalyem
        if (rest[0].expand) {
            rest.splice(0, 1);
        }
        this.setState({
            downloadedImages: [data, ...rest]
        });
        document.querySelector(".footer").click();
    }

    handleCompress(data) {
        data.expand = false;
        this.setState({
            downloadedImages: [...this.state.downloadedImages]
        });
    }

    fetchImages() {
        axios
            .get(
                `https://api.unsplash.com/photos/?page=${this.state.pageNumber}&per_page=30&client_id=${accessKey}`
            )
            .then (res => {
                this.setState({
                    pageNumber: ++this.state.pageNumber,
                    downloadedImages: [...this.state.downloadedImages, ...res.data]
                });
            })
            .catch(err => {
                /* ADD ERROR HANDLING */
                this.fetchImages();
                console.log('Error happened during fetching', err);
            });
    }

    render() {
        return (
            <>
                {
                    this.state.showSearchOrHistory ? (
                        <Form
                            inputValue={this.props.query}
                            onInputChange={this.handleInputChange}
                            onFormSubmit={this.handleFormSubmit}/>
                    ) : (
                        <SearchHistory searchHistory={this.props.searchHistory}/>
                    )
                }

                <Carousel onClick={this.handleClickCarousel}/>

                <CollageButtons/>

                <InfiniteScroll
                    dataLength={this.state.downloadedImages}
                    next={() => this.fetchImages()}
                    hasMore={true}
                    loader={<img src={require("../../gifs/loading.gif")} alt="loading gif" className="loading-gif"/>}
                >
                    <div className="collage-grid">
                        {
                            this.state.downloadedImages.map(image => image.expand ? (
                                <ExpandedImage
                                    data={image}
                                    url={image.urls.regular}
                                    key={image.id}
                                    handleCompress={this.handleCompress}
                                    favorites={this.props.favorites}
                                    addImageToFavorites={this.props.addImageToFavoritesFunction}
                                    removeImageFromFavorites={this.props.removeImageFromFavoritesFunction}/>
                                ) : (
                                <Image
                                    data={image}
                                    url={image.urls.regular}
                                    key={image.urls.regular}
                                    handleExpand={this.handleExpand}
                                    favorites={this.props.favorites}
                                    addImageToFavorites={this.props.addImageToFavoritesFunction}
                                    removeImageFromFavorites={this.props.removeImageFromFavoritesFunction}/>
                                )
                            )
                        }
                    </div>
                </InfiniteScroll>

                <Link to={`/photos/${this.props.query}`}
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
