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
            value: '',
            images: [],
            history: [],
            favorites: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetch = this.fetch.bind(this);
        this.handleFavorites = this.handleFavorites.bind(this);
    }

    handleSubmit(event, count = 5) {
        const {history, images, value} = this.state;
        console.log(`value: ${value}`);
        console.log(`history: ${history}`);

        const apiRoot = "https://api.unsplash.com";
        const accessKey = "-0xS0wk_81lBeUQ7EKpxqSCxh-XkhWTOR2tt7ibblPY";

        axios
            .get(
                `${apiRoot}/search/photos/?page=1&per_page=10&query=${value}&client_id=${accessKey}`
            )
            .then (res => {
                this.setState({
                    images: (history.length > 0 && history[history.length - 1] !== value) ? [...res.data.results] : [...images, ...res.data.results],
                    history: [...history, value]
                })
            })
            .catch(err => {
                console.log('Error happened during fetching!', err);
            });
        console.log(`images length: ${images.length}`);
        event.preventDefault();
    }

    fetch(count = 5) {
        console.log(this.state.value);
        const apiRoot = "https://api.unsplash.com";
        const accessKey = "";

        axios
            .get(
                `${apiRoot}/search/photos/?page=1&per_page=10&query=${this.state.value}&client_id=${accessKey}`
            )
            .then (res => {
                this.setState({
                    images: [...this.state.images, ...res.data.results],
                })
            })
            .catch(err => {
                console.log('Error happened during fetching!', err);
            });
        console.log(this.state.images.length);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        })
    }

    handleFavorites(like, image) {
        console.log(this.state.favorites);
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

                <Nav history={this.state.history}/>

                <Search
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}/>

                <CollageButtons/>

                <InfiniteScroll
                    dataLength={this.state.images}
                    next={() => this.fetch()}
                    hasMore={true}
                    loader={
                        <img
                            src={require("../gifs/loading.gif")}
                            alt="loading gif"
                            className="loading"
                        />}
                >
                    <div className="image-grid">
                        {(this.state.images.length > 1) ? this.state.images.map((image, index) => (
                                <Image
                                    data={image}
                                    url={image.urls.regular}
                                    key={index}
                                    onFavorites={this.handleFavorites}/>
                            )) : <ImageNotFound/>}
                    </div>

                </InfiniteScroll>

            </div>
        );
    }
}

export default Collage;