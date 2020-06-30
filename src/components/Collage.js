import React from 'react';
import axios from 'axios';
import Image from './Image';
import InfiniteScroll from 'react-infinite-scroll-component';
import '../styles/style.css'
import Search from "./Search";
import ImageNotFound from "./ImageNotFound";
import CollageButtons from "./CollageButtons";
import Nav from "./Nav";

class Collage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            images: [],
            searchHistory: [],
            favorites: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchWithQuery = this.fetchWithQuery.bind(this);
        this.handleFavorites = this.handleFavorites.bind(this);
    }

    handleSubmit(event) {
        const {searchHistory, images, query} = this.state;
        const apiRoot = "https://api.unsplash.com";
        const accessKey = "";

        axios
            .get(`${apiRoot}/search/photos/?page=1&per_page=10&query=${query}&client_id=${accessKey}`)
            .then (res => {
                this.setState({
                    images: (searchHistory.length > 0 && searchHistory[searchHistory.length - 1] !== query) ?
                        [...res.data.results] :
                        [...images, ...res.data.results],
                    searchHistory: [...searchHistory, query]
                })
            })
            .catch(err => {
                console.log('Error happened during fetching: ', err);
            });

        event.preventDefault();
    }

    fetchWithQuery() {
        const apiRoot = "https://api.unsplash.com";
        const accessKey = "SRRiJ_oUF0utzD_1LUQjziknd9NCYn9CqLEc8mMTKbM";

        axios
            .get(
                `${apiRoot}/search/photos/?page=1&per_page=10&query=${this.state.query}&client_id=${accessKey}`
            )
            .then (res => {
                this.setState({
                    images: [...this.state.images, ...res.data.results],
                })
            })
            .catch(err => {
                console.log('Error happened during fetching', err);
            });
    }

    handleChange(event) {
        this.setState({
            query: event.target.value
        })
    }

    handleFavorites(like, image) {
        if (like) {
            this.setState({
                favorites: [...this.state.favorites, image]
            })
        } else {
            const filteredFavorites = this.state.favorites.filter((item) => item !== image);
            this.setState({
                favorites: filteredFavorites
            })
        }
    }

    render() {
        return (
            <div className="container">

                <Nav searchHistory={this.state.searchHistory}/>

                <Search
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}/>

                <CollageButtons/>

                <InfiniteScroll
                    dataLength={this.state.images}
                    next={() => this.fetchWithQuery()}
                    hasMore={true}
                    loader={
                        <img src={require("../gifs/loading.gif")} alt="loading gif" className="loading"/>}
                >

                    <div className="image-grid">
                        {this.state.images.length > 1 ?
                            this.state.images.map((image, index) => (
                                <Image
                                    data={image}
                                    url={image.urls.regular}
                                    key={index}
                                    onFavorites={this.handleFavorites}/>
                                    )
                            ) : <ImageNotFound/>}
                    </div>

                </InfiniteScroll>

            </div>
        );
    }
}

export default Collage;