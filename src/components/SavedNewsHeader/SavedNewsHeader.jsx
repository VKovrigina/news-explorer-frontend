import React from 'react';
import './SavedNewsHeader.css';

function SavedNewsHeader() {
  return (
    <section className="saved-news-header">
      <div className="saved-news-header__container">
        <p className="saved-news-header__heading">Сохранённые статьи</p>
        <h1 className="saved-news-header__title">Грета, у вас 5 сохранённых статей</h1>
        <p className="saved-news-header__keywords">
          По ключевым словам:&nbsp;
          <span className="saved-news-header__keyword">Природа, Тайга</span>
          &nbsp;и&nbsp;
          <span className="saved-news-header__keyword">2-м другим</span>
        </p>
      </div>
    </section>
  );
}

export default SavedNewsHeader;
