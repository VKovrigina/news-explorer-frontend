import React from 'react';
import './NewsCardList.css';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import NotFound from '../NotFound/NotFound';
import NewsCard from '../NewsCard/NewsCard';
import Preloader from '../Preloader/Preloader';

function NewsCardList({
  isMainPage, cards, isLoggedIn, isPreloaderVisible,
}) {
  return (
    <section className="news-card-list">
      <div className="news-card-list__container">
        {isMainPage && cards.length > 0 && !isPreloaderVisible && <h2 className="news-card-list__title">Результаты поиска</h2>}
        {cards.length > 0 && (
        <div className="news-card-list__card-container">
          {cards.map((card) => (
            <NewsCard
              isLoggedIn={isLoggedIn}
              isMainPage={isMainPage}
              key={uuidv4()}
              {...card}
            />
          ))}
        </div>
        )}
        {isMainPage && !isPreloaderVisible && cards.length !== 0 && <button className="news-card-list__button" type="button">Показать еще</button>}
        {isPreloaderVisible && <Preloader /> }
        {cards.length === 0 && !isPreloaderVisible && <NotFound isMainPage={isMainPage} />}
      </div>
    </section>
  );
}

NewsCardList.propTypes = {
  isMainPage: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  cards: PropTypes.array.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isPreloaderVisible: PropTypes.bool.isRequired,
};

export default NewsCardList;
