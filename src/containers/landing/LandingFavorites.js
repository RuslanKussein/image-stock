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
        this.state = {
            rowOrGrid: false //row false, grid true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleExpandImage = this.handleExpandImage.bind(this);
        this.handleCompressImage = this.handleCompressImage.bind(this);
        this.handleClickCollageButton = this.handleClickCollageButton.bind(this);
    }

    handleChange(event) {
        this.props.setQueryFunction(event.target.value);
    }

    //IMAGE
    handleExpandImage(data) {
        const images = this.props.favorites;
        images[0].expand = false;
        data.expand = true;
        images.splice(images.indexOf(data), 1);
        this.setState({
            fetchedImages: [data, ...images]
        });
        document.querySelector(".footer").click();
    }

    handleCompressImage(data) {
        data.expand = false;
        this.setState({
            fetchedImages: [...this.state.fetchedImages]
        });
    }

    //CollageButton
    handleClickCollageButton(button) {
        if(button) {
            this.setState({
                rowOrGrid: true
            })
        } else {
            this.setState({
                rowOrGrid: false
            })
        }
    }

    render() {
        return (
            <div className="container">
                <p className="text-favorites">Избранное</p>
                <CollageButtons onButtonClick={this.handleClickCollageButton}/>
                <div className={`collage ${this.state.rowOrGrid ? "collage_grid" : "collage_row"}`} style={{marginBottom: "15px"}}>
                    {
                        this.props.favorites.map(image => image.expand ? (
                            <ExpandedImage
                                data={image}
                                url={image.urls.regular}
                                key={image.id}
                                handleCompressImage={this.handleCompressImage}
                                favorites={this.props.favorites}
                                addImageToFavorites={this.props.addImageToFavoritesFunction}
                                removeImageFromFavorites={this.props.removeImageFromFavoritesFunction}/>
                            ) : (
                            <Image
                                data={image}
                                url={image.urls.regular}
                                key={image.urls.regular}
                                handleExpandImage={this.handleExpandImage}
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
