import React from 'react';
import axios from 'axios';
import Image from './Image';
import InfiniteScroll from 'react-infinite-scroll-component';
import '../styles/style.css'
import Search from "../components/Search";
import ImageNotFound from "../components/ImageNotFound";
import CollageButtons from "../components/CollageButtons";

class Collage extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchWithQuery = this.fetchWithQuery.bind(this);
    }

    handleSubmit(event) {
        const {searchHistory, images, query} = this.props;
        const apiRoot = "https://api.unsplash.com";
        const accessKey = "";
        axios
            .get(`${apiRoot}/search/photos/?page=1&per_page=30&query=${query}&client_id=${accessKey}`)
            .then (res => {
                if (searchHistory.length > 0 && searchHistory[searchHistory.length - 1] !== query) {
                    this.props.setImages([...res.data.results]);
                } else {
                    this.props.setImages([...images, ...res.data.results]);
                }
                this.props.setSearchHistory([...searchHistory, query]);
            })
            .catch(err => {
                console.log('Error happened during fetching: ', err);
            });
        event.preventDefault();
    }

    fetchWithQuery() {
        const apiRoot = "https://api.unsplash.com";
        const accessKey = "dGct7mjhLLtRjJVaHR137Q_I5tXHXkrHDjHlrle9zzU";

        axios
            .get(
                `${apiRoot}/search/photos/?page=2&per_page=10&query=${this.props.query}&client_id=${accessKey}`
            )
            .then (res => {
                this.props.setImages([...this.props.images, ...res.data.results]);
            })
            .catch(err => {
                console.log('Error happened during fetching', err);
            });
    }

    handleChange(event) {
        this.props.setQuery(event.target.value);
    }

   componentDidMount() {
        this.fetchWithQuery();
   }

    render() {
        return (
            <div className="container">

                <Search
                    value={this.props.query}
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}/>

                <CollageButtons/>

                <InfiniteScroll
                    dataLength={this.props.images}
                    next={() => this.fetchWithQuery()}
                    hasMore={true}
                    loader={
                        <img src={require("../gifs/loading.gif")} alt="loading gif" className="loading"/>}
                >

                    <div className="image-grid">
                        {this.props.images.length > 1 ?
                            this.props.images.map((image) => (
                                <Image
                                    data={image}
                                    url={image.urls.regular}
                                    key={image.id}
                                    favorites={this.props.favorites}
                                    setFavorites={this.props.setFavorites}/>
                                    )
                            ) : <ImageNotFound/>}
                    </div>

                </InfiniteScroll>
            </div>
        );
    }
}


export default Collage;