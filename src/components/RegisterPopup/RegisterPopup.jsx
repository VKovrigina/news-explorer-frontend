/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import PopupContainer from '../PopupContainer/PopupContainer';
import useFormWithValidation from '../../hooks/useFormWithValidation';

function RegisterPopup({
  onClose, isOpen, closeByEscAndOverlay, openLoginPopup, registerErrorMessage, onSubmit,
}) {
  const {
    values, handleChange, errors, isValid, resetForm,
  } = useFormWithValidation();
  React.useEffect(() => {
    resetForm();
  }, [onClose, isOpen]);
  function openOtherPopup() {
    onClose();
    openLoginPopup();
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(values.registerName, values.registerEmail, values.registerPassword);
  }
  return (
    <PopupContainer
      title="Регистрация"
      onClose={onClose}
      isOpen={isOpen}
      closeByEscAndOverlay={closeByEscAndOverlay}
      isMessagePopup={false}
      isErrorPopup={false}
      buttonText="Зарегистрироваться"
      linkText="Войти"
      handleLinkClick={openOtherPopup}
      isButtonValid={isValid}
      errorMessage={registerErrorMessage}
      onSubmit={handleSubmit}
    >
      <label htmlFor="register-email" className="popup__form-label">
        Email
      </label>
      <input
        type="email"
        id="register-email"
        className="popup__form-input"
        placeholder="Введите почту"
        value={values.registerEmail || ''}
        name="registerEmail"
        onChange={handleChange}
        required
      />
      <span className="popup__span-error">{errors.registerEmail}</span>
      <label htmlFor="register-password" className="popup__form-label">
        Пароль
      </label>
      <input
        type="password"
        id="register-password"
        className="popup__form-input"
        placeholder="Введите пароль"
        value={values.registerPassword || ''}
        name="registerPassword"
        onChange={handleChange}
        minLength="5"
        maxLength="30"
        required
      />
      <span className="popup__span-error">{errors.registerPassword}</span>
      <label htmlFor="register-name" className="popup__form-label">
        Имя
      </label>
      <input
        type="text"
        id="register-name"
        className="popup__form-input"
        placeholder="Введите свое имя"
        value={values.registerName || ''}
        name="registerName"
        onChange={handleChange}
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__span-error">{errors.registerName}</span>
    </PopupContainer>
  );
}

RegisterPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeByEscAndOverlay: PropTypes.func.isRequired,
  openLoginPopup: PropTypes.func.isRequired,
  registerErrorMessage: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default RegisterPopup;
