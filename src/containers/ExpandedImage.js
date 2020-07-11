import React from 'react';
import UserInfo from '../components/UserInfo';

class ExpandedImage extends React.Component {
    render() {
        const {url, data: {user: {name, username, profile_image: image}, description, alt_description, links}} = this.props;
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

                        <button className="expanded-image-container__buttons__button expanded-image-container__buttons__button_like">
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

                <button className="expanded-image-container__compress-button">
                    <i className="fa fa-compress"></i>
                </button>


                {alt_descriptionArray.length === 0 ?
                    <div className="similar-tegs">
                        Похожих тегов нету
                    </div> :
                    <div className="similar-tegs">
                        Похожие теги
                        <div className="tags">
                            {alt_descriptionArray.map((item) => (
                                <div className="tags__tag">{item}</div>
                            ))}
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default ExpandedImage;