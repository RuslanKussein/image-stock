import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Provider} from "react-redux";
import * as serviceWorker from './serviceWorker';
import Header from './components/Header';
import LandingQuery from "./containers/landing/LandingQuery";
import LandingFavorites from "./containers/landing/LandingFavorites";
import LandingNew from "./containers/landing/LandingNew";
import Footer from "./components/Footer";
import store from "./redux/store";

ReactDOM.render(
    <Provider store={store}>
        <Router>
                <Header/>
                <main className="main">
                        <Route exact path="/" component={LandingNew}/>
                        <Route path="/favorites" component={LandingFavorites}/>
                        <Route path="/photos/" component={LandingQuery}/>
                </main>
                <Footer/>
        </Router>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();