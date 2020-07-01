import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from "react-router-dom";
import { Provider } from "react-redux";
import {createStore} from 'redux';
import * as serviceWorker from './serviceWorker';
import './styles/index.css';
import rootReducer from "./reducers/RootReducer";
import Nav from './components/Nav';
import Carousel from "./components/Carousel";
import LandingQuery from "./components/landing/LandingQuery";
import LandingFavorites from "./components/landing/LandingFavorites";
import LandingNew from "./components/landing/LandingNew";
import ButtonToTop from "./components/ButtonToTop";

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
                <Nav/>
                <ButtonToTop/>
                <Route exact path="/" component={LandingNew}/>
                <Route path="/favorites" component={LandingFavorites}/>
                <Route path={`/photos/${store.getState().imageStockInfo.query}`} component={LandingQuery}/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
