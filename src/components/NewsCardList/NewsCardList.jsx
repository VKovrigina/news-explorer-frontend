import React from 'react';
import './NewsCardList.css';
import PropTypes from 'prop-types';
import NotFound from '../NotFound/NotFound';
import NewsCard from '../NewsCard/NewsCard';
import Preloader from '../Preloader/Preloader';

function NewsCardList({
  isMainPage, cards, isLoggedIn, isPreloaderVisible, handleShowMoreButton,
}) {
  return (
    <section className="news-card-list">
      <div className="news-card-list__container">
        {isMainPage && cards.length > 0 && !isPreloaderVisible
          && (
          <h2 className="news-card-list__title">
            Результаты поиска
          </h2>
          )}
        {cards.length > 0 && (
        <div className="news-card-list__card-container">
          {cards.map((card) => (
            <NewsCard
              isLoggedIn={isLoggedIn}
              isMainPage={isMainPage}
              key={[card.link, card.title, card.text]}
              {...card}
            />
          ))}
        </div>
        )}
        {isMainPage && !isPreloaderVisible && cards.length !== 0
          && (
          <button className="news-card-list__button" type="button" onClick={handleShowMoreButton}>
            Показать еще
          </button>
          )}
        {isPreloaderVisible && <Preloader /> }
        {cards.length === 0 && !isPreloaderVisible
        && <NotFound isMainPage={isMainPage} />}
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
  handleShowMoreButton: PropTypes.func.isRequired,
};

export default NewsCardList;
