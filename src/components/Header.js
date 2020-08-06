import React, {PureComponent} from 'react';
import {Link} from "react-router-dom";
import '../styles/style.css'

class Header extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            onTop: true,
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
        this.setState({
            onTop: window.scrollY === 0
        })
    }

    render() {
        return (
            <header className="header">
                <nav className="nav">
                    <Link to="/">
                        <button className="nav__button nav__button_home">
                            <i className="fas fa-camera"/>
                        </button>
                    </Link>
                    <button className={`nav__button nav__button_search ${this.state.onTop && "hidden"}`}>
                        <i className="fas fa-search"/>
                    </button>
                    <Link to="/favorites">
                        <button className="nav__button nav__button_favorites">
                            <i className="fas fa-heart"/>
                        </button>
                    </Link>
                    <button className="nav__button nav__button_search-history">
                        <i className="fas fa-history"/>
                    </button>
                </nav>
            </header>
        )
    }
}

export default Header;