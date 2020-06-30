import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import {createStore} from 'redux';
import rootReducer from "./reducers/RootReducer";
import Carousel from "./components/Carousel";

const store = createStore(rootReducer);

ReactDOM.render(
    <div>

        <Provider store={store}>
            <App/>
            {/*<Carousel />*/}
        </Provider>

    </div>,
    document.getElementById('root')
);

/*
    todo
     sdelat carousel ne lagaushim
 */

window.addEventListener("scroll", function () {
    if (this.scrollY === 0) {
        document.querySelector('.nav__button_search').setAttribute('hidden', true);
        document.querySelector('.form').removeAttribute('hidden');
        //document.querySelector('.carousel').removeAttribute('hidden');
    } else {
        document.querySelector('.nav__button_search').removeAttribute('hidden');
        document.querySelector('.form').setAttribute('hidden', true);
        //document.querySelector('.carousel').setAttribute('hidden', true);
    }
});

document.querySelector('.form').addEventListener('submit', (event) => event.preventDefault());

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
