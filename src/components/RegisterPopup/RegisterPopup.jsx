/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function RegisterPopup({
  onClose, isOpen, closeByEscAndOverlay, openLoginPopup,
}) {
  function openOtherPopup() {
    onClose();
    openLoginPopup();
  }
  return (
    <PopupWithForm
      title="Регистрация"
      onClose={onClose}
      isOpen={isOpen}
      closeByEscAndOverlay={closeByEscAndOverlay}
      isMessagePopup={false}
      buttonText="Зарегистрироваться"
      linkText="Войти"
      openOtherPopup={openOtherPopup}
    >
      <label htmlFor="register-email" className="popup__form-label">
        Email
      </label>
      <input type="email" id="register-email" className="popup__form-input" placeholder="Введите почту" required />
      <label htmlFor="register-password" className="popup__form-label">
        Пароль
      </label>
      <input type="password" id="register-password" className="popup__form-input" placeholder="Введите пароль" required />
      <label htmlFor="register-name" className="popup__form-label">
        Имя
      </label>
      <input type="password" id="register-name" className="popup__form-input" placeholder="Введите свое имя" required />
    </PopupWithForm>
  );
}

RegisterPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeByEscAndOverlay: PropTypes.func.isRequired,
  openLoginPopup: PropTypes.func.isRequired,
};

export default RegisterPopup;
