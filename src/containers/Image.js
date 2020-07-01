import React from 'react';
import UserInfo from '../components/UserInfo';

class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            like: this.props.like || false
        };
        this.handleLike = this.handleLike.bind(this);
        this.handleFavorites = this.handleFavorites.bind(this);
    }

    handleLike(event) {
        this.setState({
            like: !this.state.like
        });
        const target = event.target;
        if (!this.state.like === true) {
            target.classList.remove('like_false');
            target.classList.add('like_true');
        } else {
            target.classList.remove('like_true');
            target.classList.add('like_false');
        }
        this.handleFavorites(this.props.data);
    }

    handleFavorites(image) {
        if (!this.state.like) {
            this.props.setFavorites([...this.props.favorites, image]);
        } else {
            const filteredFavorites = this.props.favorites.filter((item) => item !== image);
            this.props.setFavorites(filteredFavorites);
        }
    }

    render() {
        const {url, data: {user, description, links}} = this.props;
        return (
            <div className="collage-image-container">

                <img className="collage-image-container__image"
                     src={url}
                     alt={description || `No Description`}/>

                <div className="collage-image-container__more">
                    <UserInfo user={user}/>

                    <div className="collage-image-container__more__buttons">

                        <button className={`collage-image-container__more__buttons__button like-button ${this.state.like ? "like_true" : "like_false"}`}
                                onClick={(event) => this.handleLike(event)}>
                            <i className="fas fa-heart"></i>
                        </button>

                        <button className="collage-image-container__more__buttons__button">
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