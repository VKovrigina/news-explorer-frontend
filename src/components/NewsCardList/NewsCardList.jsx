/* eslint-disable react/require-default-props */
import React from 'react';
import './NewsCardList.css';
import PropTypes from 'prop-types';
import NotFound from '../NotFound/NotFound';
import NewsCard from '../NewsCard/NewsCard';
import Preloader from '../Preloader/Preloader';
import NewsServerError from '../NewsServerError/NewsServerError';

function NewsCardList({
  isMainPage,
  articles,
  isPreloaderVisible,
  handleShowMoreButton,
  additionalArticles,
  isNewsApiError,
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
        && !isNewsApiError && <NotFound isMainPage={isMainPage} />}
        {isNewsApiError && <NewsServerError />}
      </div>
    </section>
  );
}

NewsCardList.propTypes = {
  isMainPage: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  articles: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  additionalArticles: PropTypes.array,
  isPreloaderVisible: PropTypes.bool,
  handleShowMoreButton: PropTypes.func,
  isNewsApiError: PropTypes.bool,
};

export default NewsCardList;
