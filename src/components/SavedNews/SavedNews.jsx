import React from 'react';
import PropTypes from 'prop-types';
import './SavedNews.css';
import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

function SavedNews({ articles, isLoggedIn }) {
  return (
    <>
      <SavedNewsHeader articles={articles} />
      <NewsCardList isMainPage={false} articles={articles} isLoggedIn={isLoggedIn} />
    </>
  );
}

SavedNews.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  articles: PropTypes.array.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default SavedNews;
