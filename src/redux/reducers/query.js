import {SET_QUERY} from "../../constants/actionTypes";

const queryReducer = (query = "", action) => {
    switch (action.type) {
        case SET_QUERY:
            return action.payload;
        default:
            return query;
    }
}

export default queryReducer;