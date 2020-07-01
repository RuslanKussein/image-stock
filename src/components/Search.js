import React from 'react';

class Search extends React.Component {
    componentDidMount() {
        document.querySelector('.form').addEventListener('submit', (event) => event.preventDefault());
    }
    render() {
        const {value, onChange: handleChange, onSubmit: handleSubmit} = this.props;
        return (
            <form action="" className="form" onSubmit={(event) => handleSubmit(event)}>
                <input type="text" placeholder="Поиск" className="form__input"
                       value={value}
                       onChange={handleChange}/>

            </form>
        )
    }
}

export default Search;