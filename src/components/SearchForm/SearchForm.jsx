import React from 'react';
import './SearchForm.css';
import useFormWithValidation from '../../hooks/useFormWithValidation';

function SearchForm() {
  const {
    values, handleChange, errors, isValid, resetForm,
  } = useFormWithValidation();
  React.useEffect(() => {
    resetForm();
  }, [resetForm]);
  // eslint-disable-next-line no-console
  console.log(isValid);
  return (
    <section className="search-form">
      <div className="search-form__container">
        <div>
          <h1 className="search-form__title">Что творится в мире?</h1>
          <p className="search-form__description">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
        </div>
        { errors.article && <span className="search-form__span-error">{errors.article}</span>}
        <form className="search-form__form" noValidate>
          <input
            className="search-form__input"
            placeholder="Природа"
            required
            name="article"
            type="text"
            minLength="1"
            maxLength="30"
            value={values.article || ''}
            onChange={handleChange}
          />
          <button className={`search-form__submit-button ${!isValid ? 'search-form__submit-button_inactive' : 'search-form__submit-button_active'}`} type="submit" disabled={!isValid}>Искать</button>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
