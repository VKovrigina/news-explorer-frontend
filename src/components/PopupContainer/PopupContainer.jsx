/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import './PopupContainer.css';

function PopupContainer({
  title,
  children,
  onClose,
  isOpen,
  closeByEscAndOverlay,
  buttonText,
  linkText,
  handleLinkClick,
  isMessagePopup,
  isErrorPopup,
  isButtonValid,
  errorMessage,
  onSubmit,
}) {
  React.useEffect(() => {
    closeByEscAndOverlay();
  });
  function handleClick() {
    handleLinkClick();
  }

  return (
    <div className={`popup ${isOpen ? 'popup_open' : ''}`}>
      <div className="popup__container">
        <span
          className="popup__close-button"
          aria-label="Закрыть"
          onClick={onClose}
          role="button"
          aria-hidden="true"
        />
        <form className="popup__form" method="get" action="#" onSubmit={onSubmit} noValidate>
          <h2 className={`popup__form-title ${isErrorPopup ? 'popup__form-title_error' : ''}`}>{title}</h2>
          {!isMessagePopup
            ? (
              <>
                {children}
                <span className="popup__span-error popup__span-error_position_center">{errorMessage}</span>
                <button className={`popup__form-button ${!isButtonValid ? 'popup__form-button_disable' : 'popup__form-button_active'}`} type="submit" disabled={!isButtonValid}>{buttonText}</button>
                <p className="popup__form-paragraph">
                  или&nbsp;
                  <button className="popup__form-link popup__form-link_type_s" type="button" onClick={handleClick}>{linkText}</button>
                </p>
              </>
            )
            : <button className="popup__form-link popup__form-link_type_m" type="button" onClick={handleClick}>{linkText}</button>}
        </form>
      </div>
    </div>
  );
}

PopupContainer.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeByEscAndOverlay: PropTypes.func.isRequired,
  isMessagePopup: PropTypes.bool.isRequired,
  buttonText: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  handleLinkClick: PropTypes.func.isRequired,
  isButtonValid: PropTypes.bool,
  errorMessage: PropTypes.string,
  onSubmit: PropTypes.func,
  isErrorPopup: PropTypes.bool.isRequired,
};

export default PopupContainer;
