import React from 'react';
import '../styles/style.css'

const UserInfo = ({ user: {name, username, profile_image: image,}}) => (
    <div className="user-info-container">
        <img src={image.large} alt="" className="user-info-container__photo"/>
        <p className="user-info-container__name">{name}</p>
        <p className="user-info-container__username">@{username}</p>
    </div>
);

export default UserInfo;