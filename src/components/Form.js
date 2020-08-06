import React from 'react';

const Form = () => {
    const {inputValue, onInputChange, onFormSubmit} = this.props;
    return (
        <form action="" className="form" onSubmit={onFormSubmit}>
            <input type="text" placeholder="Поиск" className="form__input"
                   value={inputValue}
                   onChange={onInputChange}/>
        </form>
    )
}

export default Form;