import React from 'react';
import '../styles/style.css'

const ImageNotFound = () => (
    <div>
        <p className="no-content-available">No Content Available</p>
        <img src="https://media.giphy.com/media/dsMFrxB2agKf6/giphy.gif" alt="Image not found"/>
    </div>
);

export default ImageNotFound;