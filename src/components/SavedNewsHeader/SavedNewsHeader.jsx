/* eslint-disable no-param-reassign */
import React from 'react';
import './SavedNewsHeader.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function SavedNewsHeader() {
  const currentUser = React.useContext(CurrentUserContext);
  const savedArticlesLength = currentUser.savedArticles.length;
  const lastDigitArticlesLength = Number(savedArticlesLength.toString().split('').pop());
  function endingDescription() {
    let ending;
    if (savedArticlesLength === 0 || savedArticlesLength === 11
      || (savedArticlesLength >= 5 && lastDigitArticlesLength !== 1)) {
      ending = 'сохраненных статей';
    }
    if (savedArticlesLength === 1
      || (savedArticlesLength !== 11 && lastDigitArticlesLength === 1)) {
      ending = 'сохраненная статья';
    }
    if (savedArticlesLength > 1 && savedArticlesLength < 5) {
      ending = 'сохраненные статьи';
    }
    return ending;
  }
  function endingKeywords() {
    let ending;
    if (savedArticlesLength === 1
      || (savedArticlesLength !== 11 && lastDigitArticlesLength === 1)) {
      ending = 'По ключевому слову';
    }
    if (savedArticlesLength > 1) {
      ending = 'По ключевым словам';
    }
    return ending;
  }
  return (
    <section className="saved-news-header">
      <div className="saved-news-header__container">
        <p className="saved-news-header__heading">Сохранённые статьи</p>
        <h1 className="saved-news-header__title">
          {`${currentUser.name}, у вас ${currentUser.savedArticles.length} ${endingDescription()}`}
        </h1>
        {savedArticlesLength > 0 && (
        <p className="saved-news-header__keywords">
          {`${endingKeywords()}:`}
          &nbsp;
          <span className="saved-news-header__keyword">Природа, Тайга</span>
          &nbsp;и&nbsp;
          <span className="saved-news-header__keyword">2-м другим</span>
        </p>
        )}
      </div>
    </section>
  );
}

export default SavedNewsHeader;
