import React from 'react';
import UserInfo from '../components/UserInfo';

class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            like: this.search()
        };
        this.handleLike = this.handleLike.bind(this);
        this.handleFavorites = this.handleFavorites.bind(this);
        this.search = this.search.bind(this);
    }

    search() {
        for (let data of this.props.favorites) {
            if (data.urls.regular === this.props.data.urls.regular) return true;
        }
        return false;
    }

    handleLike() {
        this.setState({
            like: !this.state.like
        });
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
                                onClick={this.handleLike}>
                            <i className="fas fa-heart"></i>
                        </button>

                        <button className="collage-image-container__more__buttons__button"
                                onClick={() => this.props.handleExpand(this.props.data)}>
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