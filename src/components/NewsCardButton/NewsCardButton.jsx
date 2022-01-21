/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import './NewsCardButton.css';
import SaveCardInactive from '../../images/Book-mark-inactive';
import SaveCardActive from '../../images/Book-mark-active';
import DeleteCard from '../../images/DeleteIcon';

function NewsCardButton({
  isMainPage, isLoggedIn, isSave, saveArticle, deleteArticle,
}) {
  function buttonIcon() {
    let icon;
    if (isMainPage && isSave) {
      icon = SaveCardActive;
    } else if (isMainPage && !isSave) {
      icon = SaveCardInactive;
    } else {
      icon = DeleteCard;
    }
    return icon;
  }
  function buttonClasses() {
    let classes = 'news-card__button';
    if (isMainPage && isSave) {
      classes += ' news-card__button_active';
    } else if (isMainPage && !isSave) {
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
    } else if (isMainPage && !isSave && isLoggedIn) {
      text = 'Cохранить статью';
    } else if (isMainPage && isSave && isLoggedIn) {
      text = 'Убрать из сохраненных';
    } else if (!isMainPage) {
      text = 'Убрать из сохраненных';
    }
    return text;
  }
  function handleClick() {
    if (isLoggedIn && !isSave && isMainPage) {
      saveArticle();
    }
    if (isLoggedIn && isSave) {
      deleteArticle();
    }
  }
  return (
    <button
      className={buttonClasses()}
      type="button"
      data-tooltip={HelpText()}
      aria-label={HelpText()}
      onClick={handleClick}
      disabled={!isLoggedIn}
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
  isSave: PropTypes.bool.isRequired,
  saveArticle: PropTypes.func,
  deleteArticle: PropTypes.func.isRequired,
};

export default NewsCardButton;
