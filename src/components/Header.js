import React, {PureComponent} from 'react';
import {Link} from "react-router-dom";
import '../styles/style.css'
import History from "./History";
import {setQueryAction} from "../redux/actions/query";
import {addImageToFavoritesAction, removeImageFromFavoritesAction} from "../redux/actions/favorites";
import {addToSearchHistoryAction, clearSearchHistoryAction} from "../redux/actions/searchHistory";
import {connect} from "react-redux";
import DescentSearch from "./DescentSearch";

class Header extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            onTop: true,
            showHistory: false,
            showDescentSearch: false
        };
        this.handleScroll = this.handleScroll.bind(this);
        this.handleDescentSearch = this.handleDescentSearch.bind(this);
        this.handleDescentHistory = this.handleDescentHistory.bind(this);
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }
    //SCROLL
    handleScroll() {
        this.setState({
            onTop: window.scrollY === 0
        })
    }

    //DESCENT HISTORY
    handleDescentHistory() {
        this.setState({
            showHistory: !this.state.showHistory,
            showDescentSearch: false,
        });
    }

    //DESCENT SEARCH
    handleDescentSearch() {
        this.setState({
            showDescentSearch: !this.state.showDescentSearch,
            showHistory: false
        });
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
                        <button className={`nav__button nav__button_search ${this.state.onTop && "hidden"}`} onClick={this.handleDescentSearch}>
                            <i className="fas fa-search"/>
                        </button>
                        <Link to="/favorites">
                            <button className="nav__button nav__button_favorites">
                                <i className="fas fa-heart"/>
                            </button>
                        </Link>
                        <button className="nav__button nav__button_search-history" onClick={this.handleDescentHistory}>
                            <i className="fas fa-history"/>
                        </button>
                    </nav>
                </header>

                {
                    //HISTORY
                    this.state.showHistory && <History history={this.props.searchHistory}/>
                }

                {
                    //DESCENT SEARCH
                    this.state.showDescentSearch && <DescentSearch/>
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
