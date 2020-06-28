import React from 'react';
import '../styles/style.css'

const CollageButtons = () => (
    <div className="collage__buttons">

        <button className="collage__buttons__button horizontal-button selected">
            <i className="fas fa-grip-lines"></i>
        </button>

        <button className="collage__buttons__button grid-button">
            <i className="fas fa-th-large"></i>
        </button>

    </div>
);

export default CollageButtons;
