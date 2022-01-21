import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import newsApi from '../../utils/NewsApi';
import { MONTH_NAMES, COUNT_NEW_ARTICLES } from '../../utils/constants';

function App() {
  /** статьи  */
  const [currentArticles, setCurrentArticles] = React.useState(JSON.parse(localStorage.getItem('currentArticles')) || []);
  const [additionalArticles, setAdditionalArticles] = React.useState(JSON.parse(localStorage.getItem('additionalArticles')) || []);
  /** другое */
  const [isNewsCardListVisible, setIsNewsCardListVisible] = React.useState(JSON.parse(localStorage.getItem('isNewsCardListVisible')) || false);
  const [isPreloaderVisible, setIsPreloaderVisible] = React.useState(false);
  const [isNewsServerError, setNewsServerError] = React.useState(false);
  const [isFormLoading, setFormLoading] = React.useState(false);
  /** работа со статьями */
  function changeDateFormat(date) {
    const newDate = date.split('T')[0].split('-').reverse();
    const newMonth = `${MONTH_NAMES[Number(newDate[1]) - 1]},`;
    newDate.splice(1, 1, newMonth);
    return newDate.join(' ');
  }
  /** сабмит для формы поиска новостей  */
  function handleSearchFormSubmit(value) {
    setIsNewsCardListVisible(true);
    localStorage.setItem('keyword', JSON.stringify(value));
    localStorage.setItem('isNewsCardListVisible', JSON.stringify(true));
    setCurrentArticles([]);
    setAdditionalArticles([]);
    setIsPreloaderVisible(true);
    setFormLoading(true);
    newsApi.getArticles(value)
      .then((res) => {
        const articles = res.articles.map((item) => ({
          keyword: value,
          title: item.title,
          text: item.description,
          date: changeDateFormat(item.publishedAt),
          source: item.source.name,
          link: item.url,
          image: item.urlToImage,
        }));
        const firstArticles = articles.splice(0, COUNT_NEW_ARTICLES);
        setCurrentArticles(firstArticles);
        setAdditionalArticles(articles);
        if (firstArticles.length > 0) {
          localStorage.setItem('currentArticles', JSON.stringify(firstArticles));
        } else {
          localStorage.removeItem('currentArticles');
        }
        if (articles.length > 0) {
          localStorage.setItem('additionalArticles', JSON.stringify(articles));
        } else {
          localStorage.removeItem('additionalArticles');
        }
      })
      .catch(() => {
        setNewsServerError(true);
        localStorage.removeItem('additionalArticles');
        localStorage.removeItem('currentArticles');
        localStorage.removeItem('keyword');
        localStorage.removeItem('isNewsCardListVisible');
      })
      .finally(() => {
        setIsPreloaderVisible(false);
        setFormLoading(false);
      });
  }
  function handleShowMoreButton() {
    if (additionalArticles.length > 0) {
      const moreArticles = additionalArticles.splice(0, COUNT_NEW_ARTICLES);
      setCurrentArticles([...currentArticles, ...moreArticles]);
      localStorage.setItem('currentArticles', JSON.stringify([...currentArticles, ...moreArticles]));
      localStorage.setItem('additionalArticles', JSON.stringify(additionalArticles));
    } else {
      localStorage.removeItem('additionalArticles');
    }
  }

  return (
    <div className="app">
      <Header />
      <Main
        articles={currentArticles}
        additionalArticles={additionalArticles}
        handleSearchFormSubmit={handleSearchFormSubmit}
        isNewsCardListVisible={isNewsCardListVisible}
        isPreloaderVisible={isPreloaderVisible}
        handleShowMoreButton={handleShowMoreButton}
        isNewsApiError={isNewsServerError}
        isFormLoading={isFormLoading}
      />
      <Footer />
    </div>
  );
}

export default App;
