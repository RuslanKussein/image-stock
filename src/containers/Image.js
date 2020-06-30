import React from 'react';
import UserInfo from '../components/UserInfo';

class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            like: this.props.like || false
        };
        this.handleLike = this.handleLike.bind(this);
        this.addOrRemoveImage = this.addOrRemoveImage.bind(this);
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

    }

    handleFavorites(like, image) {
        if (like) {
            this.props.setFavorites([...this.props.favorites, image]);
        } else {
            const filteredFavorites = this.props.favorites.filter((item) => item !== image);
            this.props.setFavorites(filteredFavorites);
        }
    }

    addOrRemoveImage(event) {
        if (event.target.parentElement && event.target.parentElement.classList.contains('like-button')) {
            this.handleFavorites(!this.state.like, this.props.data);
        }
    }

    render() {
        const {url, data: {user, description}} = this.props;
        {console.log(this.state.like)}
        return (
            <div className="collage-image-container" onClick={(event) => this.addOrRemoveImage(event)}>

                <img src={url} className="collage-image-container__image" alt={description}/>

                <div className="collage-image-container__more">

                    <UserInfo user={user}/>

                    <div className="collage-image-container__more__buttons">

                        <button className={`collage-image-container__more__buttons__button like-button ${this.state.like ? "like_true" : "like_false"}`} onClick={(event) => this.handleLike(event)}>
                            <i className="fas fa-heart"></i>
                        </button>

                        <button className="collage-image-container__more__buttons__button">
                            <i className="fas fa-expand-arrows-alt"></i>
                        </button>

                        <button className="collage-image-container__more__buttons__button download">
                            <i className="fas fa-arrow-circle-down"></i>
                        </button>

                    </div>

                </div>
            </div>
        );
    }
}

export default Image;