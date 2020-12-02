/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import './PopupWithForm.css';

function PopupWithForm({
  title,
  children,
  onClose,
  isOpen,
  closeByEscAndOverlay,
  buttonText,
  linkText,
  openOtherPopup,
  isMessagePopup,
  isButtonValid,
  errorMessage,
  onSubmit,
}) {
  React.useEffect(() => {
    closeByEscAndOverlay();
  });
  function handleClick() {
    openOtherPopup();
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
        <form className="popup__form" method="get" action="#" onSubmit={onSubmit}>
          <h2 className="popup__form-title">{title}</h2>
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

PopupWithForm.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeByEscAndOverlay: PropTypes.func.isRequired,
  isMessagePopup: PropTypes.bool.isRequired,
  buttonText: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  openOtherPopup: PropTypes.func.isRequired,
  isButtonValid: PropTypes.bool,
  errorMessage: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default PopupWithForm;
