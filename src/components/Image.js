import React from 'react';

const Image = ({url}) => (
    <div className="image-container">
        <img src={url} className="image-container__image"/>
    </div>
);

export default Image;