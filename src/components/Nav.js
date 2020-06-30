import React from 'react';
import '../styles/style.css'
import {Link} from "react-router-dom";

class Nav extends React.Component {
    componentDidMount() {
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

    }

    render() {
        return (
            <div className="nav">
                <Link to="/">
                    <button className="nav__button nav__button_home"><i className="fas fa-camera"></i></button>
                </Link>

                <button className="nav__button nav__button_search" onClick={() => window.scrollTo(0, 0)}>
                    <i className="fas fa-search"></i>
                </button>

                <Link to="/favorites">
                    <button className="nav__button nav__button_favorites"><i className="fas fa-heart"></i></button>
                </Link>

                <Link to="/history">
                    <button className="nav__button nav__button_search-history"><i className="fas fa-history"></i>
                    </button>
                </Link>

            </div>
        )
    }
}

export default Nav;