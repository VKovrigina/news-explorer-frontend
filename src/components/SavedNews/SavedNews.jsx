import React from 'react';
import PropTypes from 'prop-types';
import './SavedNews.css';
import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

function SavedNews({ cards, isLoggedIn }) {
  return (
    <>
      <SavedNewsHeader />
      <NewsCardList isMainPage={false} cards={cards} isLoggedIn={isLoggedIn} />
    </>
  );
}

SavedNews.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  cards: PropTypes.array.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default SavedNews;
