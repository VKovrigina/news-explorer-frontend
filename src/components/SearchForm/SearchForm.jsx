import React from 'react';
import PropTypes from 'prop-types';
import './SearchForm.css';
import useFormWithValidation from '../../hooks/useFormWithValidation';

function SearchForm({ onSubmit, isLoading }) {
  const {
    values, handleChange, errors, isValid, resetForm,
  } = useFormWithValidation();
  React.useEffect(() => {
    resetForm();
  }, [resetForm]);
  function handleSubmit(e) {
    e.preventDefault();

    onSubmit(values.article);
  }
  function isButtonDisabled() {
    let isDisabled;
    if (!isValid || isLoading) {
      isDisabled = true;
    } else {
      isDisabled = false;
    }
    return isDisabled;
  }
  return (
    <section className="search-form">
      <div className="search-form__container">
        <div>
          <h1 className="search-form__title">Что творится в мире?</h1>
          <p className="search-form__description">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
        </div>
        { errors.article && <span className="search-form__span-error">{errors.article}</span>}
        <form className="search-form__form" onSubmit={handleSubmit} noValidate>
          <input
            className="search-form__input"
            placeholder={JSON.parse(localStorage.getItem('keyword')) || 'Введите ключевое слово'}
            required
            name="article"
            type="text"
            minLength="1"
            maxLength="30"
            value={values.article || ''}
            onChange={handleChange}
          />
          <button className={`search-form__submit-button ${isButtonDisabled() ? 'search-form__submit-button_inactive' : 'search-form__submit-button_active'}`} type="submit" disabled={isButtonDisabled()}>Искать</button>
        </form>
      </div>
    </section>
  );
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default SearchForm;
