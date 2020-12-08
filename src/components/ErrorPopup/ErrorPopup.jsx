import React from 'react';
import PropTypes from 'prop-types';
import PopupContainer from '../PopupContainer/PopupContainer';

function ErrorPopup({
  onClose, isOpen, closeByEscAndOverlay, errorText,
}) {
  return (
    <PopupContainer
      title={errorText}
      onClose={onClose}
      isOpen={isOpen}
      closeByEscAndOverlay={closeByEscAndOverlay}
      isMessagePopup
      isErrorPopup
      buttonText=""
      linkText="Закрыть"
      handleLinkClick={onClose}
    />
  );
}

ErrorPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeByEscAndOverlay: PropTypes.func.isRequired,
  errorText: PropTypes.string.isRequired,
};

export default ErrorPopup;
