import React from 'react';
import PropTypes from 'prop-types';
import './Main.css';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';

function Main({
  articles,
  additionalArticles,
  isLoggedIn,
  handleSearchFormSubmit,
  isNewsCardListVisible,
  isPreloaderVisible,
  handleShowMoreButton,
}) {
  return (
    <>
      <SearchForm onSubmit={handleSearchFormSubmit} />
      {
      isNewsCardListVisible
      && (
      <NewsCardList
        isMainPage
        articles={articles}
        additionalArticles={additionalArticles}
        isLoggedIn={isLoggedIn}
        isPreloaderVisible={isPreloaderVisible}
        handleShowMoreButton={handleShowMoreButton}
      />
      )
}
      <About />
    </>
  );
}

Main.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  articles: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  additionalArticles: PropTypes.array.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  handleSearchFormSubmit: PropTypes.func.isRequired,
  isNewsCardListVisible: PropTypes.bool.isRequired,
  isPreloaderVisible: PropTypes.bool.isRequired,
  handleShowMoreButton: PropTypes.func.isRequired,
};

export default Main;
