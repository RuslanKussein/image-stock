import React, {PureComponent} from 'react';
import {Link} from "react-router-dom";
import '../styles/style.css'
import History from "./History";
import {setQueryAction} from "../redux/actions/query";
import {addImageToFavoritesAction, removeImageFromFavoritesAction} from "../redux/actions/favorites";
import {addToSearchHistoryAction, clearSearchHistoryAction} from "../redux/actions/searchHistory";
import {connect} from "react-redux";

class Header extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            onTop: true,
            showHistory: false
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
            <>
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
                        <button className="nav__button nav__button_search-history" onClick={() => this.setState({showHistory: !this.state.showHistory})}>
                            <i className="fas fa-history"/>
                        </button>
                    </nav>
                </header>

                {
                    //SHOW HISTORY LOGIC
                    this.state.showHistory && <History history={this.props.searchHistory}/>
                }
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        searchHistory: state.searchHistory
    }
}

export default connect(mapStateToProps)(Header);
