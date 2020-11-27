import React from 'react';
import PropTypes from 'prop-types';
import './Main.css';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';

function Main({
  cards, isLoggedIn, handleSearchFormSubmit, isNewsCardListVisible,
}) {
  return (
    <>
      <SearchForm onSubmit={handleSearchFormSubmit} />
      { isNewsCardListVisible && <NewsCardList isMainPage cards={cards} isLoggedIn={isLoggedIn} />}
      <About />
    </>
  );
}

Main.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  cards: PropTypes.array.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  handleSearchFormSubmit: PropTypes.func.isRequired,
  isNewsCardListVisible: PropTypes.bool.isRequired,
};

export default Main;
