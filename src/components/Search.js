import React from 'react';

const Search = ({value, onChange: handleChange, onSubmit: handleSubmit}) => (
    <form action="" className="form"
          onSubmit={(event) => handleSubmit(event)}>

        <input type="text" placeholder="Поиск" className="form__input" value={value}
               onChange={handleChange}/>

    </form>
);

export default Search;