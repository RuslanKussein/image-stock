import React from 'react';
import '../styles/App.css';
import { connect } from "react-redux";
import setQueryAction from '../actions/actionQuery';
import setImagesAction from '../actions/actionImages';
import setFavoritesAction from '../actions/actionFavorites';
import setSearchHistoryAction from '../actions/actionSearchHistory';
import setImagesHistoryAction from '../actions/actionImagesHistory';
import Collage from './Collage';

const App = (props) => (

    <div>

        <Collage
            query={props.query}
            images={props.images}
            favorites={props.favorites}
            searchHistory={props.searchHistory}
            imagesHistory={props.imagesHistory}
            setQuery={props.setQueryFunction}
            setImages={props.setImagesFunction}
            setFavorites={props.setFavoritesFunction}
            setSearchHistory={props.setSearchHistoryFunction}
            setImagesHistory={props.setImagesHistoryFunction}/>

    </div>
);

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

export default connect(mapStateToProps, mapDispatchToProps)(App);
