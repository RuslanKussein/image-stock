import {createStore} from "redux";
import root from "./reducers/root";

const store = createStore(root);

window.store = store;

export default store;