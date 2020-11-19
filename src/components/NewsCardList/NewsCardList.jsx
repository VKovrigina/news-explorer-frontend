import React from 'react';
import './NewsCardList.css';
import PropTypes from 'prop-types';
// import NotFound from '../../images/not-found.svg';
import NewsCard from '../NewsCard/NewsCard';

function NewsCardList({ isMainPage, cards }) {
  return (
    <section className="news-card-list">
      <div className="news-card-list__container">
        {isMainPage && <h2 className="news-card-list__title">Результаты поиска</h2>}
        <div className="news-card-list__card-container">
          {cards.map((card) => <NewsCard isMainPage={isMainPage} key={card._id} {...card} />)}
        </div>
        {isMainPage && <button className="news-card-list__button" type="button">Показать еще</button>}
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

NewsCardList.propTypes = {
  isMainPage: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  cards: PropTypes.array.isRequired,
};

export default NewsCardList;
