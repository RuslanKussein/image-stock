import React, {PureComponent} from 'react';
import '../styles/style.css'

class CollageButtons extends PureComponent {
    render() {
        return (
            <div className="collage__buttons">
                <button className="collage__buttons__button collage__buttons__button_selected">
                    <i className="fas fa-grip-lines"></i>
                </button>
                <button className="collage__buttons__button">
                    <i className="fas fa-th-large"></i>
                </button>
            </div>
        );
    }
}

export default CollageButtons;
