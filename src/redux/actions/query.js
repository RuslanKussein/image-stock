import {SET_QUERY} from "../../constants/actionTypes";

export function setQueryAction(query) {
    return {
        type: SET_QUERY,
        payload: query
    }
}