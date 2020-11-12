import React from 'react';
import './NewsCardList.css';

function NewsCardList() {
  return (
    <section className="news-card-list">
      <div className="news-card-list__container">
        <h2 className="news-card-list__title">Результаты поиска</h2>
        <button className="news-card-list__button" type="button">Показать еще</button>
      </div>
    </section>
  );
}

export default NewsCardList;
