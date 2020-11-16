import React from 'react';
import './Main.css';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';

function Main() {
  return (
    <>
      <SearchForm />
      <NewsCardList />
      <About />
    </>
  );
}

export default Main;
