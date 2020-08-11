import React, {PureComponent} from 'react';
import OwlCarousel from "react-owl-carousel";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import {popularSearchTags} from "../constants/other";
import '../styles/style.css'

class Carousel extends PureComponent {
    render() {
        return (
            <div className="carousel" onClick={this.props.onClick}>
                <OwlCarousel
                    className="owl-theme"
                    margin={10}
                    dots={false}
                    touchDrag
                >
                    {
                        popularSearchTags.map(tag => (
                            <div className="item"><p>{tag}</p></div>
                        ))
                    }
                </OwlCarousel>
            </div>
        )
    }
}

export default Carousel;