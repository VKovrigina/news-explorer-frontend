import React from 'react';
import PropTypes from 'prop-types';
import './NewsCardButton.css';
import SaveCardInactive from '../../images/Book-mark-inactive.svg';
import SaveCardActive from '../../images/Book-mark-active.svg';
import DeleteCard from '../../images/DeleteIcon.svg';

function NewsCardButton({ isMainPage }) {
  const [isCardSave, setCardSave] = React.useState(false);
  function buttonIcon() {
    let icon;
    if (isMainPage && isCardSave) {
      icon = SaveCardActive;
    } else if (isMainPage && !isCardSave) {
      icon = SaveCardInactive;
    } else {
      icon = DeleteCard;
    }
    return icon;
  }
  function buttonClasses() {
    let classes = 'news-card__button';
    if (isMainPage && isCardSave) {
      classes += ' news-card__button_active';
    } else if (isMainPage && !isCardSave) {
      classes += ' news-card__button_inactive';
    } else {
      classes += ' news-card__button_inactive';
    }
    return classes;
  }
  return (
    <button
      className={buttonClasses()}
      type="button"
      aria-label={`${isMainPage ? 'Сохранить статью' : 'Удалить статью'}`}
      onClick={() => setCardSave(!isCardSave)}
    >
      <img
        className="news-card__button-img"
        src={buttonIcon()}
        alt={`${isMainPage ? 'Сохранить статью' : 'Удалить статью'}`}
      />
    </button>
  );
}

NewsCardButton.propTypes = {
  isMainPage: PropTypes.bool.isRequired,
};

export default NewsCardButton;
