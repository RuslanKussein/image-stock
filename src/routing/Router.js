import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

export default (
 <Router>
     <Link to="/">Home</Link>
     <Link to="/favorites">Favorites</Link>
     <Link to="/history">History</Link>

     <Route exact path="/" />
     {/*<Route path="/favorites" component={LandingFavorites}/>
     <Route path="/history" component={LandingHistory}/>*/}

 </Router>
);