/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function LoginPopup({
  onClose, isOpen, closeByEscAndOverlay, openRegisterPopup,
}) {
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
    >
      <label htmlFor="login-email" className="popup__form-label">
        Email
      </label>
      <input type="email" id="login-email" className="popup__form-input" placeholder="Введите почту" required />
      <label htmlFor="login-password" className="popup__form-label">
        Пароль
      </label>
      <input type="password" id="login-password" className="popup__form-input" placeholder="Введите пароль" required />
    </PopupWithForm>
  );
}

LoginPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeByEscAndOverlay: PropTypes.func.isRequired,
  openRegisterPopup: PropTypes.func.isRequired,
};

export default LoginPopup;
