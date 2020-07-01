import React from 'react';
import { connect } from "react-redux";
import setFavoritesAction from '../../actions/actionFavorites';
import Image from "../../containers/Image";
import CollageButtons from "../CollageButtons";
import Search from "../Search";
import setQueryAction from "../../actions/actionQuery";
import Carousel from "../Carousel";

class LandingFavorites extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {

    }

    handleChange(event) {
        this.props.setQueryFunction(event.target.value);
    }

    componentDidMount() {
        document.querySelector(".collage__buttons").classList.add("margin100");
        document.querySelector('.nav__button_search').removeAttribute('hidden');
    }

    render() {
        return (
            <div className="container">
                Избранное
                <CollageButtons />

                <div className="image-grid">
                        {this.props.favorites.map((image) => (
                            <Image
                                data={image}
                                url={image.urls.regular}
                                key={image.id}
                                like
                                favorites={this.props.favorites}
                                setFavorites={this.props.setFavoritesFunction} />
                            )
                        )}
                </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(LandingFavorites);
