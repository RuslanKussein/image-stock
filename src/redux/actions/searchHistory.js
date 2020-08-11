import {ADD_TO_SEARCH_HISTORY, CLEAR_SEARCH_HISTORY} from "../../constants/actionTypes";

export function addToSearchHistoryAction(query) {
    return {
        type: ADD_TO_SEARCH_HISTORY,
        payload: query
    }
}

export function clearSearchHistoryAction() {
    return {
        type: CLEAR_SEARCH_HISTORY,
    }
}