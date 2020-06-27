import React from 'react';

const Search = ({onSubmit: handleSubmit,onChange: handleChange}) => (
    <form action=""
          className="form"
          onSubmit={(event) => handleSubmit(event)}>
        <input type="text"
               placeholder="Поиск"
               className="form__input"
               onChange={handleChange}/>
    </form>
);

export default Search;