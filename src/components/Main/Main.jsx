import React from 'react';
import './Main.css';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';

function Main() {
  return (
    <>
      <SearchForm />
      <NewsCardList />
    </>
  );
}

export default Main;
