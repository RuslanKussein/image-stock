import React from 'react';

const Form = props => {
    const {inputValue, onInputChange, onFormSubmit} = props;
    return (
        <form action="" className="form" onSubmit={onFormSubmit}>
            <input type="text" placeholder="Поиск" className="form__input"
                   value={inputValue}
                   onChange={onInputChange}/>
        </form>
    )
}

export default Form;