import React, {Component} from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import '../../styles/style.css';
import {addImageToFavoritesAction, removeImageFromFavoritesAction} from '../../actions/favorites';
import {addToSearchHistoryAction, clearSearchHistoryAction} from '../../actions/searchHistory';
import Carousel from "../../components/Carousel";
import Form from "../../components/Form";
import CollageButtons from "../../components/CollageButtons";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "../../containers/Image";
import ImageNotFound from "../../components/ImageNotFound";
import {setQueryAction} from "../../actions/query";
import ExpandedImage from "../ExpandedImage";

class LandingQuery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1,
            downloadedImages: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchWithQuery = this.fetchWithQuery.bind(this);
        this.handleClickCarousel = this.handleClickCarousel.bind(this);
        this.handleExpand = this.handleExpand.bind(this);
        this.handleCompress = this.handleCompress.bind(this);
        this.accessKey = "dGct7mjhLLtRjJVaHR137Q_I5tXHXkrHDjHlrle9zzU";
    }

    componentDidMount() {
        this.handleSubmit();
    }

    handleSubmit() {
        const {searchHistory, query} = this.props;
        axios
            .get(`https://api.unsplash.com/search/photos/?page=1&per_page=30&query=${query}&client_id=${this.accessKey}`)
            .then (res => {
                if (searchHistory.length > 0 && searchHistory[searchHistory.length - 1] !== query) {
                    this.setState({
                        pageNumber: 2,
                        downloadedImages: [...res.data.results]
                    });
                } else {
                    this.setState({
                        pageNumber: 2,
                        downloadedImages: [...this.state.downloadedImages, ...res.data.results]
                    });
                }
                this.props.addToSearchHistoryFunction(query);
            })
            .catch(err => {
                this.handleSubmit();
                console.log('Error happened during fetching: ', err);
            });
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

    handleClickCarousel(query) {
        this.props.setQueryFunction(query);
        this.handleSubmit();
    }

    fetchWithQuery() {
        axios
            .get(
                `https://api.unsplash.com/search/photos/?page=${this.state.pageNumber}&per_page=10&query=${this.props.query}&client_id=${this.accessKey}`
            )
            .then (res => {
                this.setState({
                    pageNumber: ++this.state.pageNumber,
                    downloadedImages: [...this.state.downloadedImages, ...res.data.results]
                });
            })
            .catch(err => {
                /* ADD ERROR HANDLING */
                console.log('Error happened during fetching', err);
            });
    }

    handleChange(event) {
        this.props.setQueryFunction(event.target.value);
    }

    render() {
        return (
             <>
                 <Form
                     value={this.props.query}
                     onChange={this.handleChange}
                     onSubmit={this.handleSubmit}/>

                 <Carousel onClick={this.handleClickCarousel}/>

                 <CollageButtons/>

                 <InfiniteScroll
                     dataLength={this.state.downloadedImages}
                     next={() => this.fetchWithQuery()}
                     hasMore={true}
                     loader={<img src={require("../../gifs/loading.gif")} alt="loading gif" className="loading-gif"/>}
                 >
                     <div className="collage-grid">
                         {
                             this.state.downloadedImages.length > 1 ? (
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
