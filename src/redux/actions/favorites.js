import {ADD_IMAGE_TO_FAVORITES, REMOVE_IMAGE_FROM_FAVORITES} from "../../constants/actionTypes";

export function addImageToFavoritesAction(image) {
    return {
        type: ADD_IMAGE_TO_FAVORITES,
        payload: image
    }
}

export function removeImageFromFavoritesAction(image) {
    return {
        type: REMOVE_IMAGE_FROM_FAVORITES,
        payload: image
    }
}