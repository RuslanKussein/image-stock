import React, {PureComponent} from 'react';
import {noTags} from "../constants/other";

class ExpandedImage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            like: this.isLiked()
        };
        this.handleLike = this.handleLike.bind(this);
        this.isLiked = this.isLiked.bind(this);
    }

    isLiked() {
        for (let data of this.props.favorites) {
            if (data.urls.regular === this.props.data.urls.regular) return true;
        }
        return false;
    }

    handleLike() {
        if (this.state.like) {
            this.props.removeImageFromFavorites(this.props.data)
        } else {
            this.props.addImageToFavorites(this.props.data);
        }

        this.setState({
            like: !this.state.like
        });
    }

    render() {
        const { url, handleCompressImage, data: { user: {name, username, profile_image: image}, description, alt_description, links } } = this.props;
        const alt_descriptionArray = alt_description ? alt_description.split(' ') : [];

        return (
            <div className="expanded-image-container">
                <div className="expanded-image-container__more">
                    <div className="expanded-image-container__user">
                        <img src={image.large} alt="user's photo" className="expanded-image-container__user__photo"/>
                        <div className="expanded-image-container__user__info">
                            <p className="expanded-image-container__user__info__name">{name}</p>
                            <p className="expanded-image-container__user__info__username">@{username}</p>
                        </div>
                    </div>
                    <div className="expanded-image-container__buttons">
                        <button className={`expanded-image-container__buttons__button expanded-image-container__buttons__button_like ${this.state.like && "like_true"}`} onClick={this.handleLike}>
                            <i className="fas fa-heart"></i>
                        </button>
                        <a className="expanded-image-container__buttons__button expanded-image-container__buttons__button_download" href={`${links.download}`} target="_blank">
                            <i className="fas fa-arrow-circle-down"></i>
                        </a>
                    </div>
                </div>
                <img className="expanded-image-container__image" src={url} alt={description || `No Description`}/>
                <button className="expanded-image-container__compress-button" onClick={() => handleCompressImage(this.props.data)}>
                    <i className="fa fa-compress"></i>
                </button>
               {
                    alt_descriptionArray.length ? (
                        <>
                            <p className="similar-tags-header">Похожие теги</p>
                            <div className="similar-tags">
                                {alt_descriptionArray.map(item =>
                                    noTags.indexOf(item) === -1 && !item.endsWith("ing") &&  <div className="similar-tags__tag">{item}</div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="similar-tags">
                            К сожалению, автор не добавил тегов
                        </div>
                    )
                }
            </div>
        );
    }
}

export default ExpandedImage;