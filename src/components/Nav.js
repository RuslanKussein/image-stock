import React from 'react';
import '../styles/style.css'

const Nav = props => (
    <div className="nav">

        <button className="nav__button nav__button_home">
            <i className="fas fa-camera"></i>
        </button>

        <button className="nav__button nav__button_search" onClick={() => window.scrollTo(0,0)}>
            <i className="fas fa-search"></i>
        </button>

        <button className="nav__button nav__button_favorites" onClick={() => console.log(props.favorites)}>
            <i className="fas fa-heart"></i>
        </button>

        <button className="nav__button nav__button_search-history" onClick={() => console.log(props.searchHistory)}>
            <i className="fas fa-history"></i>
        </button>

    </div>
);

export default Nav;