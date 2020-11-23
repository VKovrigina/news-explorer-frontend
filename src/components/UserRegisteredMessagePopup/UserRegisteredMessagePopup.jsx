import React from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function UserRegisteredMessagePopup({
  onClose, isOpen, closeByEscAndOverlay, openLoginPopup,
}) {
  function openOtherPopup() {
    onClose();
    openLoginPopup();
  }
  return (
    <PopupWithForm
      title="Пользователь успешно зарегистрирован!"
      onClose={onClose}
      isOpen={isOpen}
      closeByEscAndOverlay={closeByEscAndOverlay}
      isMessagePopup
      buttonText=""
      linkText="Войти"
      openOtherPopup={openOtherPopup}
    />
  );
}

UserRegisteredMessagePopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeByEscAndOverlay: PropTypes.func.isRequired,
  openLoginPopup: PropTypes.func.isRequired,
};

export default UserRegisteredMessagePopup;
