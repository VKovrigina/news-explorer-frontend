import React from 'react';
import PropTypes from 'prop-types';
import './Main.css';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';

function Main({
  articles,
  additionalArticles,
  handleSearchFormSubmit,
  isNewsCardListVisible,
  isPreloaderVisible,
  handleShowMoreButton,
  isNewsApiError,
  isFormLoading,
}) {
  return (
    <>
      <SearchForm onSubmit={handleSearchFormSubmit} isLoading={isFormLoading} />
      {
      isNewsCardListVisible
      && (
      <NewsCardList
        isMainPage
        articles={articles}
        additionalArticles={additionalArticles}
        isPreloaderVisible={isPreloaderVisible}
        handleShowMoreButton={handleShowMoreButton}
        isNewsApiError={isNewsApiError}
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
  handleSearchFormSubmit: PropTypes.func.isRequired,
  isNewsCardListVisible: PropTypes.bool.isRequired,
  isPreloaderVisible: PropTypes.bool.isRequired,
  handleShowMoreButton: PropTypes.func.isRequired,
  isNewsApiError: PropTypes.bool.isRequired,
  isFormLoading: PropTypes.bool.isRequired,
};

export default Main;
