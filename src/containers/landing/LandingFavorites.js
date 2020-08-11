import React from 'react';
import { connect } from "react-redux";
import {addImageToFavoritesAction, removeImageFromFavoritesAction} from '../../redux/actions/favorites';
import Image from "../Image";
import CollageButtons from "../../components/CollageButtons";
import {setQueryAction} from "../../redux/actions/query";
import ExpandedImage from "../ExpandedImage";

class LandingFavorites extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.setQueryFunction(event.target.value);
    }

    render() {
        return (
            <div className="container">
                <p className="text-favorites">Избранное</p>
                <CollageButtons />
                <div className="collage" style={{marginBottom: "15px"}}>
                    {
                        this.props.favorites.map(image => image.expand ? (
                            <ExpandedImage
                                data={image}
                                url={image.urls.regular}
                                key={image.id}
                                handleCompress={this.handleCompress}
                                favorites={this.props.favorites}
                                addImageToFavorites={this.props.addImageToFavoritesFunction}
                                removeImageFromFavorites={this.props.removeImageFromFavoritesFunction}/>
                            ) : (
                            <Image
                                data={image}
                                url={image.urls.regular}
                                key={image.urls.regular}
                                handleExpand={this.handleExpand}
                                favorites={this.props.favorites}
                                addImageToFavorites={this.props.addImageToFavoritesFunction}
                                removeImageFromFavorites={this.props.removeImageFromFavoritesFunction}/>
                            ))
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        query: state.query,
        favorites: state.favorites,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setQueryFunction: query => {
            dispatch(setQueryAction(query))
        },
        addImageToFavoritesFunction: image => {
            dispatch(addImageToFavoritesAction(image))
        },
        removeImageFromFavoritesFunction: image => {
            dispatch(removeImageFromFavoritesAction(image))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingFavorites);
