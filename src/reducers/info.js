
const initialState = {
    query: '',
    images: [],
    favorites: [],
    searchHistory: [],
    imagesHistory: []
};

export default function imageStockInfo (state = initialState, action) {
    switch (action.type) {
        case "SET_QUERY":
            return {
                ...state,
                query: action.payload
            };
        case "SET_FAVORITES":
            return {
                ...state,
                favorites: action.payload
            };
        case "SET_IMAGES":
            return {
                ...state,
                images: action.payload
            };
        case "SET_IMAGES-HISTORY":
            return {
                ...state,
                imagesHistory: action.payload
            };
        case "SET_SEARCH-HISTORY":
            return {
                ...state,
                searchHistory: action.payload
            };
        default:
            return state;
    }
}