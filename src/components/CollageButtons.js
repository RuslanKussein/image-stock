import React, {createRef, PureComponent} from 'react';
import '../styles/style.css'

class CollageButtons extends PureComponent {
    constructor(props) {
        super(props);
        this.rowButton = createRef();
        this.gridButton = createRef();
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleButtonClick(addButton, removeButton, bool) {
        addButton.current && addButton.current.classList.add("collage__buttons__button_selected");
        removeButton.current && removeButton.current.classList.remove("collage__buttons__button_selected");
        this.props.onButtonClick(bool);
    }

    render() {
        return (
            <div className="collage__buttons">
                <button className="collage__buttons__button collage__buttons__button_selected"
                        ref={this.rowButton}
                        onClick={() => this.handleButtonClick(this.rowButton, this.gridButton, false)}>
                    <i className="fas fa-grip-lines"></i>
                </button>
                <button className="collage__buttons__button"
                        ref={this.gridButton}
                        onClick={() => this.handleButtonClick(this.gridButton, this.rowButton, true)}>
                    <i className="fas fa-th-large"></i>
                </button>
            </div>
        );
    }
}

export default CollageButtons;
