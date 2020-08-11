import {combineReducers} from "redux";
import queryReducer from "./query";
import favoritesReducer from "./favorites";
import searchHistoryReducer from "./searchHistory";

const rootReducer = combineReducers({
    query: queryReducer,
    favorites: favoritesReducer,
    searchHistory: searchHistoryReducer
});

export default rootReducer;