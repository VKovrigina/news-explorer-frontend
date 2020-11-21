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
}) {
  React.useEffect(() => {
    closeByEscAndOverlay();
  });

  return (
    <div className={`popup ${isOpen ? 'popup_open' : ''}`}>
      <div className="popup__container">
        <span
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
          role="button"
          aria-hidden="true"
        />
        <form className="popup__form" method="get" action="#">
          <h2 className="popup__form-title">{title}</h2>
          {children}
          <button className="popup__form-button" type="submit">{buttonText}</button>
          <p className="popup__form-paragraph">
            или&nbsp;
            <button className="popup__form-link" type="button" onClick={() => openOtherPopup()}>{linkText}</button>
          </p>
        </form>
      </div>
    </div>
  );
}

PopupWithForm.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.isRequired,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeByEscAndOverlay: PropTypes.func.isRequired,
  // isMessagePopup: PropTypes.bool.isRequired,
  buttonText: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  openOtherPopup: PropTypes.func.isRequired,
};

export default PopupWithForm;
