import React from 'react';
import PropTypes from 'prop-types';
import './SavedNews.css';
import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

function SavedNews({ articles, isLoggedIn, deleteArticle }) {
  return (
    <>
      <SavedNewsHeader articles={articles} />
      <NewsCardList
        isMainPage={false}
        articles={articles}
        isLoggedIn={isLoggedIn}
        deleteArticle={deleteArticle}
      />
    </>
  );
}

SavedNews.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  articles: PropTypes.array.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  deleteArticle: PropTypes.func.isRequired,
};

export default SavedNews;
