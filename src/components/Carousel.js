import React, {PureComponent} from 'react';
import '../styles/style.css'
import OwlCarousel from "react-owl-carousel";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import {popularSearchTags} from "../constants/other";

class Carousel extends PureComponent {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false;
    }

    render() {
        return (
            <div className="carousel" onClick={event => this.props.onClick(event.target.textContent)}>
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