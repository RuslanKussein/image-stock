import React from 'react';
import './App.css';
import Collage from '../components/Collage';
import Carousel from "../components/Carousel";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "../components/Image";
import ImageNotFound from "../components/ImageNotFound";

function App() {
    return (
        <div>
            <InfiniteScroll
                dataLength={props.favorites}
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

window.addEventListener("scroll", function () {
    if (this.scrollY === 0) {
        document.querySelector('.nav__button_search').setAttribute('hidden', true);
        document.querySelector('.form').removeAttribute('hidden');
        document.querySelector('.carousel').removeAttribute('hidden');
    } else {
        document.querySelector('.nav__button_search').removeAttribute('hidden');
        document.querySelector('.form').setAttribute('hidden', true);
        document.querySelector('.carousel').setAttribute('hidden', true);
    }
});

