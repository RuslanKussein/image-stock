import React, {Component} from 'react';
import '../styles/style.css'
import {Link} from "react-router-dom";

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isTop: true
        };
        this.handleScroll = this.handleScroll.bind(this);
    }
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll() {
        if (window.scrollY === 0) {
            this.setState({
                isTop: true
            });
        } else {
            this.setState({
                isTop: false
            });
        }
    }

    render() {
        return (
            <nav className="nav">
                <Link to="/">
                    <button className="nav__button nav__button_home"><i className="fas fa-camera"/></button>
                </Link>

                <button className="nav__button nav__button_search" hidden={this.state.isTop}><i className="fas fa-search"/></button>

                <Link to="/favorites">
                    <button className="nav__button nav__button_favorites"><i className="fas fa-heart"/></button>
                </Link>

                <Link to="/history">
                    <button className="nav__button nav__button_search-history"><i className="fas fa-history"/></button>
                </Link>
            </nav>
        )
    }
}

export default Nav;