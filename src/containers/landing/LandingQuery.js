import React, {Component} from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import '../../styles/style.css';
import setQueryAction from '../../actions/actionQuery';
import setImagesAction from '../../actions/actionImages';
import setFavoritesAction from '../../actions/actionFavorites';
import setSearchHistoryAction from '../../actions/actionSearchHistory';
import setImagesHistoryAction from '../../actions/actionImagesHistory';
import Carousel from "../../components/Carousel";
import Search from "../../components/Search";
import CollageButtons from "../../components/CollageButtons";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "../../containers/Image";
import ImageNotFound from "../../components/ImageNotFound";

class LandingQuery extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchWithQuery = this.fetchWithQuery.bind(this);
        this.accessKey = "";
    }

    componentDidMount() {
        this.fetchWithQuery();
    }

    handleSubmit() {
        const {searchHistory, images, query} = this.props;
        axios
            .get(`https://api.unsplash.com/search/photos/?page=1&per_page=30&query=${query}&client_id=${this.accessKey}`)
            .then (res => {
                if (searchHistory.length > 0 && searchHistory[searchHistory.length - 1] !== query) {
                    this.props.setImagesFunction([...res.data.results]);
                } else {
                    this.props.setImagesFunction([...images, ...res.data.results]);
                }
                this.props.setSearchHistoryFunction([...searchHistory, query]);
            })
            .catch(err => {
                console.log('Error happened during fetching: ', err);
            });
    }

    fetchWithQuery() {
        axios
            .get(
                `https://api.unsplash.com/search/photos/?page=2&per_page=10&query=${this.props.query}&client_id=${this.accessKey}`
            )
            .then (res => {
                this.props.setImagesFunction([...this.props.images, ...res.data.results]);
            })
            .catch(err => {
                console.log('Error happened during fetching', err);
            });
    }

    handleChange(event) {
        this.props.setQueryFunction(event.target.value);
    }

    render() {
        return (
             <div>
                 <Carousel
                     setQuery={this.props.setQueryFunction} />

                 <div className="container">

                     <Search
                         value={this.props.query}
                         onChange={this.handleChange}
                         onSubmit={this.handleSubmit}/>

                     <CollageButtons/>

                     <InfiniteScroll
                         dataLength={this.props.images}
                         next={() => this.fetchWithQuery()}
                         hasMore={true}
                         loader={
                             <img src={require("../../gifs/loading.gif")} alt="loading gif" className="loading"/>}
                     >

                         <div className="image-grid">
                             {this.props.images.length > 1 ?
                                 this.props.images.map((image) => (
                                         <Image
                                             data={image}
                                             url={image.urls.regular}
                                             key={image.id}
                                             favorites={this.props.favorites}
                                             setFavorites={this.props.setFavoritesFunction}/>
                                     )
                                 ) : <ImageNotFound/>}
                         </div>

                     </InfiniteScroll>
                 </div>
             </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        query: state.imageStockInfo.query,
        images: state.imageStockInfo.images,
        favorites: state.imageStockInfo.favorites,
        searchHistory: state.imageStockInfo.searchHistory,
        imagesHistory: state.imageStockInfo.imagesHistory
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setQueryFunction: query => {
            dispatch(setQueryAction(query))
        },

        setImagesFunction: images => {
            dispatch(setImagesAction(images))
        },

        setFavoritesFunction: favorites => {
            dispatch(setFavoritesAction(favorites))
        },

        setSearchHistoryFunction: searchHistory => {
            dispatch(setSearchHistoryAction(searchHistory))
        },

        setImagesHistoryFunction: imagesHistory => {
            dispatch(setImagesHistoryAction(imagesHistory))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingQuery);
