import {ADD_TO_SEARCH_HISTORY, CLEAR_SEARCH_HISTORY} from "../constants/actionTypes";

const searchHistoryReducer = (searchHistory = [], action) => {
    switch (action.type) {
        case ADD_TO_SEARCH_HISTORY:
            return [...searchHistory, action.payload];
        case CLEAR_SEARCH_HISTORY:
            return [];
        default:
            return searchHistory;
    }
}

export default searchHistoryReducer;