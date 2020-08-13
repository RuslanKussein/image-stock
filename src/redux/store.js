import {createStore} from "redux";
import root from "./reducers/root";
import { composeWithDevTools } from 'redux-devtools-extension'
import {persistStore} from "./storeEnhancers/statePersistence";

const store = createStore(
    root,
    composeWithDevTools(persistStore)
);

window.store = store;

export default store;