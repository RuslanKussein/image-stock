import {createStore} from "redux";
import root from "./reducers/root";
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(
    root,
    composeWithDevTools()
);

window.store = store;

export default store;