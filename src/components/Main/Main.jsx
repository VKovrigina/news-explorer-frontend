import React from 'react';
import PropTypes from 'prop-types';
import './Main.css';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';

function Main({ cards }) {
  return (
    <>
      <SearchForm />
      <NewsCardList isMainPage cards={cards} />
      <About />
    </>
  );
}

Main.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  cards: PropTypes.array.isRequired,
};

export default Main;
