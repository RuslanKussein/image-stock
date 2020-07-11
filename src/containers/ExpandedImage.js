import React from 'react';
import UserInfo from '../components/UserInfo';

class ExpandedImage extends React.Component {
    render() {
        const {url, data: {user, description, alt_description}} = this.props;
        const alt_descriptionArray = alt_description ? alt_description.split(' ') : [];
        return (
            <div className="expanded-image-container">
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