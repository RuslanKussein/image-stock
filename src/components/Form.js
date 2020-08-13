import React, {PureComponent} from 'react';

class Form extends PureComponent {
    constructor(props) {
        super(props);
        this.form = React.createRef();
    }
    componentDidMount() {
        document.querySelector(".nav__button_search").addEventListener("click", () => this.form.current && this.form.current.classList.toggle("form_fixed"));
    }

    render() {
        const {inputValue, onInputChange, onFormSubmit} = this.props;
        return (
            <form action="" className="form" onSubmit={onFormSubmit} ref={this.form}>
                <input type="text" placeholder="Поиск" className="form__input"
                       value={inputValue}
                       onChange={onInputChange}/>
            </form>
        )
    }
}

export default Form;