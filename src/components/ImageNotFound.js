import React from 'react';
import '../styles/style.css'

const ImageNotFound = () => (
    <div>
        <p className="no-content-available">No Content Available</p>
        <img src={require("../gifs/garfield.gif")} alt="no content available"/>
    </div>
);

export default ImageNotFound;