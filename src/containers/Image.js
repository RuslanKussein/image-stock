import React from 'react';
import UserInfo from '../components/UserInfo';

class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            like: false
        };
        this.handleLike = this.handleLike.bind(this);
        this.addOrRemoveImage = this.addOrRemoveImage.bind(this);
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

    addOrRemoveImage(event, handleFavorites) {
        if (event.target.parentElement && event.target.parentElement.classList.contains('like-button')) {
            handleFavorites(!this.state.like, event.currentTarget)
        }
    }

    render() {
        const {url, data: {user, description}, onFavorites: handleFavorites} = this.props;
        return (
            <div className="collage-image-container" onClick={(event) => this.addOrRemoveImage(event, handleFavorites)}>

                <img src={url} className="collage-image-container__image" alt={description}/>

                <div className="collage-image-container__more">

                    <UserInfo user={user}/>

                    <div className="collage-image-container__more__buttons">

                        <button className="collage-image-container__more__buttons__button like-button like_false" onClick={(event) => this.handleLike(event)}>
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