/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import useFormWithValidation from '../../hooks/useFormWithValidation';

function LoginPopup({
  onClose, isOpen, closeByEscAndOverlay, openRegisterPopup, loginErrorMessage,
}) {
  const {
    values, handleChange, errors, isValid, resetForm,
  } = useFormWithValidation();
  React.useEffect(() => {
    resetForm();
  }, [onClose, resetForm, isOpen]);
  function openOtherPopup() {
    onClose();
    openRegisterPopup();
  }
  return (
    <PopupWithForm
      title="Вход"
      onClose={onClose}
      isOpen={isOpen}
      closeByEscAndOverlay={closeByEscAndOverlay}
      isMessagePopup={false}
      buttonText="Войти"
      linkText="Зарегистрироваться"
      openOtherPopup={openOtherPopup}
      errorMessage={loginErrorMessage}
      isButtonValid={isValid}
    >
      <label htmlFor="login-email" className="popup__form-label">
        Email
      </label>
      <input
        type="email"
        id="login-email"
        className="popup__form-input"
        placeholder="Введите почту"
        value={values.loginEmail || ''}
        name="loginEmail"
        onChange={handleChange}
        required
      />
      <span className="popup__span-error">{errors.loginEmail}</span>
      <label htmlFor="login-password" className="popup__form-label">
        Пароль
      </label>
      <input
        type="password"
        id="login-password"
        className="popup__form-input"
        placeholder="Введите пароль"
        value={values.loginPassword || ''}
        name="loginPassword"
        onChange={handleChange}
        minLength="5"
        maxLength="30"
        required
      />
      <span className="popup__span-error">{errors.loginPassword}</span>
    </PopupWithForm>
  );
}

LoginPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeByEscAndOverlay: PropTypes.func.isRequired,
  openRegisterPopup: PropTypes.func.isRequired,
  loginErrorMessage: PropTypes.string.isRequired,
};

export default LoginPopup;
