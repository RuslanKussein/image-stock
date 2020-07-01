import React,{Component} from 'react';
import { connect } from "react-redux";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import setFavoritesAction from '../../actions/actionFavorites';
import setQueryAction from "../../actions/actionQuery";
import Image from "../../containers/Image";
import CollageButtons from "../CollageButtons";
import Search from "../Search";
import Carousel from "../Carousel";
import {Link} from "react-router-dom";

class LandingNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            downloadedImages: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.fetch = this.fetch.bind(this);
    }

    componentDidMount() {
        this.fetch();
        document.querySelector('.nav__button_search').setAttribute('hidden', true);
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleSubmit() {
        document.querySelector('.linkToQuery').click();
    }

    handleChange(event) {
        this.props.setQueryFunction(event.target.value);
    }

    handleScroll() {
        if (this.scrollY === 0) {
            document.querySelector('.nav__button_search').setAttribute('hidden', true);
            document.querySelector('.form').removeAttribute('hidden');
            document.querySelector('.carousel').removeAttribute('hidden');
        } else {
            document.querySelector('.nav__button_search').removeAttribute('hidden');
            document.querySelector('.form').setAttribute('hidden', true);
            document.querySelector('.carousel').setAttribute('hidden', true);
        }
    }

    fetch() {
        const apiRoot = "https://api.unsplash.com";
        const accessKey = "";

        axios
            .get(
                `${apiRoot}/photos/?page=1&per_page=30&client_id=${accessKey}`
            )
            .then (res => {
                this.setState({
                    downloadedImages: [...this.state.downloadedImages, ...res.data]
                });
            })
            .catch(err => {
                console.log('Error happened during fetching', err);
            });
    }

    render() {
        return (
            <div className="container">
                <Search
                    value={this.props.query}
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}/>

                <Carousel
                    setQuery={this.props.setQueryFunction} />

                <CollageButtons
                    setQuery={this.props.setQueryFunction}
                    style={{marginTop: "100px"}}/>

                <InfiniteScroll
                    dataLength={this.state.downloadedImages}
                    next={() => this.fetch()}
                    hasMore={true}
                    loader={
                        <img src={require("../../gifs/loading.gif")} alt="loading gif" className="loading"/>}
                >

                    <div className="image-grid">
                        {this.state.downloadedImages.map((image) => (
                                <Image
                                    data={image}
                                    url={image.urls.regular}
                                    key={image.id}
                                    favorites={this.props.favorites}
                                    setFavorites={this.props.setFavoritesFunction} />
                            )
                        )}
                    </div>
                </InfiniteScroll>

                <Link to={`/photos/${this.props.query}`} className="linkToQuery"></Link>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        query: state.imageStockInfo.query,
        favorites: state.imageStockInfo.favorites,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setQueryFunction: query => {
            dispatch(setQueryAction(query))
        },
        setFavoritesFunction: favorites => {
            dispatch(setFavoritesAction(favorites))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingNew);
