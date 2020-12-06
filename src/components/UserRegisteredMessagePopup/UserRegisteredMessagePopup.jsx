import React from 'react';
import PropTypes from 'prop-types';
import PopupContainer from '../PopupContainer/PopupContainer';

function UserRegisteredMessagePopup({
  onClose, isOpen, closeByEscAndOverlay, openLoginPopup,
}) {
  function openOtherPopup() {
    onClose();
    openLoginPopup();
  }
  return (
    <PopupContainer
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
