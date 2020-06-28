import React from 'react';
import UserInfo from './UserInfo';

class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            like: false
        };
        this.handleLike = this.handleLike.bind(this);
    }

    handleLike(handleFavorites, id) {
        this.setState({
            like: !this.state.like
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.like !== this.state.like) {
            const {data, onFavorites: handleFavorites} = this.props;
            handleFavorites(this.state.like, data.id);
            const target = document.querySelector(('.like_true' || '.like_false'));
            if (this.state.like === true) {
                target.classList.remove('.like_true');
                target.classList.add('.like_false');
            } else {
                target.classList.remove('.like_false');
                target.classList.add('.like_true');
            }
        }
    }

    render() {
        const {url, data: {user, description}} = this.props;
        return (
            <div className="collage-image-container">

                <img src={url} className="collage-image-container__image" alt={description}/>

                <div className="collage-image-container__more">

                    <UserInfo user={user}/>

                    <div className="collage-image-container__more__buttons">

                        <button className="collage-image-container__more__buttons__button like_false" onClick={this.handleLike}>
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