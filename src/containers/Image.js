import React from 'react';
import UserInfo from '../components/UserInfo';
import {addImageToFavoritesAction, removeImageFromFavoritesAction} from "../actions/favorites";

class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            like: this.search()
        };
        this.handleLike = this.handleLike.bind(this);
        this.search = this.search.bind(this);
    }

    search() {
        for (let data of this.props.favorites) {
            if (data.urls.regular === this.props.data.urls.regular) return true;
        }
        return false;
    }

    handleLike() {
        if (this.state.like) {
            removeImageFromFavoritesAction(this.props.data)
        } else {
            addImageToFavoritesAction(this.props.data);
        }

        this.setState({
            like: !this.state.like
        });
    }

    render() {
        const {url, data: {user, description, links}, handleExpand} = this.props;
        return (
            <div className="collage-image-container">

                <img className="collage-image-container__image"
                     src={url}
                     alt={description || `No Description`}/>

                <div className="collage-image-container__more">
                    <UserInfo user={user}/>

                    <div className="collage-image-container__more__buttons">

                        <button className={`collage-image-container__more__buttons__button like-button ${this.state.like ? "like_true" : "like_false"}`}
                                onClick={this.handleLike}>
                            <i className="fas fa-heart"></i>
                        </button>

                        <button className="collage-image-container__more__buttons__button"
                                onClick={() => handleExpand(this.props.data)}>
                            <i className="fas fa-expand-arrows-alt"></i>
                        </button>

                        <a className="collage-image-container__more__buttons__button download"
                           href={`${links.download}`}
                           target="_blank">
                            <i className="fas fa-arrow-circle-down"></i>
                        </a>

                    </div>

                </div>

            </div>
        );
    }
}

export default Image;