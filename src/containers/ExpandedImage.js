import React from 'react';
import UserInfo from '../components/UserInfo';
import {addImageToFavoritesAction, removeImageFromFavoritesAction} from "../actions/favorites";

class ExpandedImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            like: this.search()
        };
        this.handleLike = this.handleLike.bind(this);
        this.search = this.search.bind(this);
        this.noTags = ["on", "at", "in", "to", "over", "up", "round", "towards", "the", "and", "or", "so"];
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
        const {url, handleCompress, data: {user: {name, username, profile_image: image}, description, alt_description, links}} = this.props;
        const alt_descriptionArray = alt_description ? alt_description.split(' ') : [];
        return (
            <div className="expanded-image-container">

                <div className="expanded-image-container__more">
                    <div className="expanded-image-container__user">
                        <img src={image.large} alt="" className="expanded-image-container__user__photo"/>
                        <div className="expanded-image-container__user__info">
                            <p className="expanded-image-container__user__info__name">{name}</p>
                            <p className="expanded-image-container__user__info__username">@{username}</p>
                        </div>
                    </div>

                    <div className="expanded-image-container__buttons">

                        <button className={`expanded-image-container__buttons__button expanded-image-container__buttons__button_like ${this.state.like ? "like_true" : ""}`}
                                onClick={this.handleLike}>
                            <i className="fas fa-heart"></i>
                        </button>

                        <a className="expanded-image-container__buttons__button expanded-image-container__buttons__button_download"
                           href={`${links.download}`}
                           target="_blank">
                            <i className="fas fa-arrow-circle-down"></i>
                        </a>

                    </div>
                </div>

                <img className="expanded-image-container__image"
                     src={url}
                     alt={description || `No Description`}/>

                <button className="expanded-image-container__compress-button"
                        onClick={() => handleCompress(this.props.data)}>
                    <i className="fa fa-compress"></i>
                </button>


                {alt_descriptionArray.length === 0 ?
                    <div className="similar-tegs">
                        К сожалению, автор не добавил тегов
                    </div> :
                    <div className="similar-tegs">
                        Похожие теги
                        <div className="tags">
                            {alt_descriptionArray.map((item) => (
                                (this.noTags.indexOf(item) === -1 && !item.endsWith("ing"))?
                                    <div className="tags__tag">{item}</div> :
                                    ""
                            ))}
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default ExpandedImage;