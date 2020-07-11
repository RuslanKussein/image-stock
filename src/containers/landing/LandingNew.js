import React,{Component} from 'react';
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import setFavoritesAction from '../../actions/actionFavorites';
import setQueryAction from "../../actions/actionQuery";
import Image from "../Image";
import CollageButtons from "../../components/CollageButtons";
import Search from "../../components/Search";
import Carousel from "../../components/Carousel";

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
    }

    handleSubmit() {
        document.querySelector('.linkToQuery').click();
    }

    handleChange(event) {
        this.props.setQueryFunction(event.target.value);
    }

    fetch() {
        const accessKey = "";
        axios
            .get(
                `https://api.unsplash.com/photos/?page=1&per_page=30&client_id=${accessKey}`
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

                <CollageButtons/>

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

                <Link to={`/photos/${this.props.query}`} className="linkToQuery"/>
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