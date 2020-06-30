import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import {createStore} from 'redux';
import rootReducer from "./reducers/RootReducer";
import {BrowserRouter, Route} from "react-router-dom";
import Nav from './components/Nav';
import LandingQuery from "./components/landing/LandingQuery";
import LandingFavorites from "./components/landing/LandingFavorites";

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>

        <BrowserRouter>

            <Nav/>

            <Route exact path="/" component={LandingQuery}/>

            <Route path="/favorites" component={LandingFavorites}/>

        </BrowserRouter>

    </Provider>,
    document.getElementById('root')
);
/*todo
               1.add Route component = LandingNew
               2.add Route component = LandingHistory
           */

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
