import React from 'react';
import { connect } from "react-redux";
import setFavoritesAction from '../../actions/actionFavorites';
import Image from "../../containers/Image";
import CollageButtons from "../CollageButtons";
import Search from "../Search";
import setQueryAction from "../../actions/actionQuery";

class LandingFavorites extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit() {
        document.querySelector('.nav__button_home').click();
    }

    handleChange(event) {
        this.props.setQueryFunction(event.target.value);
    }

    render() {
        return (
            <div className="container">

                <Search
                    value={this.props.query}
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}/>

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
