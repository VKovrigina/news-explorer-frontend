/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import PopupContainer from '../PopupContainer/PopupContainer';
import useFormWithValidation from '../../hooks/useFormWithValidation';

function LoginPopup({
  onClose, isOpen, closeByEscAndOverlay, openRegisterPopup, loginErrorMessage, onSubmit,
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
  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(values.loginEmail, values.loginPassword);
  }
  return (
    <PopupContainer
      title="Вход"
      onClose={onClose}
      isOpen={isOpen}
      closeByEscAndOverlay={closeByEscAndOverlay}
      isMessagePopup={false}
      isErrorPopup={false}
      buttonText="Войти"
      linkText="Зарегистрироваться"
      handleLinkClick={openOtherPopup}
      errorMessage={loginErrorMessage}
      isButtonValid={isValid}
      onSubmit={handleSubmit}
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
    </PopupContainer>
  );
}

LoginPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeByEscAndOverlay: PropTypes.func.isRequired,
  openRegisterPopup: PropTypes.func.isRequired,
  loginErrorMessage: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default LoginPopup;
