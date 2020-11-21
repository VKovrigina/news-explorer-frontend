import React from 'react';
import PropTypes from 'prop-types';
import './PopupWithForm.css';

function PopupWithForm({
  title,
  children,
  onClose,
  isOpen,
  closeByEscAndOverlay,
}) {
  React.useEffect(() => {
    closeByEscAndOverlay();
  });

  return (
    <div className={`popup ${isOpen ? 'popup_open' : ''}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <form className="popup__form" method="get" action="#">
          <h2 className="popup__form-title">{title}</h2>
          {children}
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
};

export default PopupWithForm;
