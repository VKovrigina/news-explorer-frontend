import React from 'react';
import './SearchForm.css';

function SearchForm() {
  return (
    <div className="search-form">
      <div className="search-form__container">
        <div>
          <h1 className="search-form__title">Что творится в мире?</h1>
          <p className="search-form__description">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
        </div>
        <form className="search-form__form">
          <input className="search-form__input" placeholder="Природа" required />
          <button className="search-form__submit-button" type="submit">Искать</button>
        </form>
      </div>
    </div>
  );
}

export default SearchForm;
