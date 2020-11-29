import React from 'react';
import './NewsCardList.css';
import PropTypes from 'prop-types';
import NotFound from '../NotFound/NotFound';
import NewsCard from '../NewsCard/NewsCard';
import Preloader from '../Preloader/Preloader';

function NewsCardList({
  isMainPage, articles, isLoggedIn, isPreloaderVisible, handleShowMoreButton, additionalArticles,
}) {
  return (
    <section className="news-card-list">
      <div className="news-card-list__container">
        {isMainPage && articles.length > 0 && !isPreloaderVisible
          && (
          <h2 className="news-card-list__title">
            Результаты поиска
          </h2>
          )}
        {articles.length > 0 && (
        <div className="news-card-list__card-container">
          {articles.map((article) => (
            <NewsCard
              isLoggedIn={isLoggedIn}
              isMainPage={isMainPage}
              key={[article.link, article.title, article.text]}
              {...article}
            />
          ))}
        </div>
        )}
        {isMainPage && !isPreloaderVisible && additionalArticles.length !== 0
          && (
          <button className="news-card-list__button" type="button" onClick={handleShowMoreButton}>
            Показать еще
          </button>
          )}
        {isPreloaderVisible && <Preloader /> }
        {articles.length === 0 && !isPreloaderVisible
        && <NotFound isMainPage={isMainPage} />}
      </div>
    </section>
  );
}

NewsCardList.propTypes = {
  isMainPage: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  articles: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  additionalArticles: PropTypes.array.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isPreloaderVisible: PropTypes.bool.isRequired,
  handleShowMoreButton: PropTypes.func.isRequired,
};

export default NewsCardList;
