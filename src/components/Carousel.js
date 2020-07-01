import React from 'react';
import '../styles/style.css'
import OwlCarousel from "react-owl-carousel";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import setQueryAction from "../actions/actionQuery";
import {connect} from "react-redux";

const Carousel = props => (
    <div className="carousel" onClick={(event) => props.setQuery(event.target.textContent)}>
        <OwlCarousel
            className="owl-theme"
            margin={10}
            dots={false}
            touchDrag
        >
            <div className="item"><p>Wallpapers</p> </div>
            <div className="item"><p>Textures & Patterns</p></div>
            <div className="item"><p>Nature</p></div>
            <div className="item"><p>Current Events</p></div>
            <div className="item"><p>Architecture</p></div>
            <div className="item"><p>Business & Work</p></div>
            <div className="item"><p>Film</p></div>
            <div className="item"><p>Animals</p></div>
            <div className="item"><p>Travel</p></div>
            <div className="item"><p>Fashion</p></div>
            <div className="item"><p>Food & Drink</p></div>
            <div className="item"><p>Eminem</p></div>
            <div className="item"><p>Bill Gates</p></div>
            <div className="item"><p>COVID-19</p></div>
            <div className="item"><p>Girls</p></div>
            <div className="item"><p>Technology</p></div>
            <div className="item"><p>Street Workout</p></div>
        </OwlCarousel>
    </div>
);

export default Carousel;