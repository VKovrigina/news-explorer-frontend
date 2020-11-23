import React from 'react';
import PropTypes from 'prop-types';
import './NewsCardButton.css';
import SaveCardInactive from '../../images/Book-mark-inactive.svg';
import SaveCardActive from '../../images/Book-mark-active.svg';
import DeleteCard from '../../images/DeleteIcon.svg';

function NewsCardButton({ isMainPage, isLoggedIn }) {
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
  function HelpText() {
    let text;
    if (!isLoggedIn) {
      text = 'Войдите, чтобы сохранять статьи';
    } else if (isMainPage && !isCardSave && isLoggedIn) {
      text = 'Cохранить статью';
    } else if (isMainPage && isCardSave && isLoggedIn) {
      text = 'Убрать из сохраненных';
    } else if (!isMainPage) {
      text = 'Убрать из сохраненных';
    }
    return text;
  }
  return (
    <button
      className={buttonClasses()}
      type="button"
      data-tooltip={HelpText()}
      aria-label={HelpText()}
      onClick={() => setCardSave(!isCardSave)}
    >
      <img
        className="news-card__button-img"
        src={buttonIcon()}
        alt={HelpText()}
      />
    </button>
  );
}

NewsCardButton.propTypes = {
  isMainPage: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default NewsCardButton;
