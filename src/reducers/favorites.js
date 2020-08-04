import {ADD_IMAGE_TO_FAVORITES, REMOVE_IMAGE_FROM_FAVORITES} from "../constants/actionTypes";

const favoritesReducer = (favorites = [], action) => {
    switch (action.type) {
        case ADD_IMAGE_TO_FAVORITES:
            return [...favorites, action.payload];
        case REMOVE_IMAGE_FROM_FAVORITES:
            return favorites.filter(image => image.id !== action.payload.id);
        default:
            return favorites;
    }
}


export default favoritesReducer;