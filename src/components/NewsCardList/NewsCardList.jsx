import React from 'react';
import './NewsCardList.css';
// import NotFound from '../../images/not-found.svg';

function NewsCardList() {
  return (
    <section className="news-card-list">
      <div className="news-card-list__container">
        {/* <h2 className="news-card-list__title">Результаты поиска</h2>
        <button className="news-card-list__button" type="button">Показать еще</button> */}
        {/* <i className="news-card-list__circle-preloader" />
        <p className="new-card-list__description">Идет поиск новостей...</p> */}
        {/* <img className="news-card-list__not-found-img" alt="Ничего не найдено" src={NotFound} />
        <p className="news-card-list__not-found-title">Ничего не найдено</p>
        <p className="new-card-list__description">
          К сожалению по вашему запросу ничего не найдено.
        </p> */}
      </div>
    </section>
  );
}

export default NewsCardList;
