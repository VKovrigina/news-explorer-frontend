import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import { dataSave } from '../../utils/data';
import LoginPopup from '../LoginPopup/LoginPopup';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import UserRegisteredMessagePopup from '../UserRegisteredMessagePopup/UserRegisteredMessagePopup';
import MobileMenu from '../MobileMenu/MobileMenu';
import newsApi from '../../utils/NewsApi';
import { monthNames } from '../../utils/constants';

function App() {
  const location = useLocation();
  // eslint-disable-next-line no-unused-vars
  const [isUserLoggedIn, setUserLoggedIn] = React.useState(false);
  /** попапы  */
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [isUserRegisteredPopupOpen, setIsUserRegisteredPopupOpen] = React.useState(false);
  /** мобильное меню  */
  const [isMenuMobileOpen, setIsMenuMobileOpen] = React.useState(false);
  const [isButtonMenuActive, setIsButtonMenuActive] = React.useState(false);
  /** статьи  */
  const [currentArticles, setCurrentArticles] = React.useState([]);
  // eslint-disable-next-line no-unused-vars
  const [additionalArticles, setAdditionalArticles] = React.useState([]);
  const [isNewsCardListVisible, setIsNewsCardListVisible] = React.useState(false);
  const [isPreloaderVisible, setIsPreloaderVisible] = React.useState(false);
  /** попапы  */
  function handleLoginPopupOpen() {
    setIsLoginPopupOpen(true);
  }
  function handleRegisterPopupOpen() {
    setIsRegisterPopupOpen(true);
  }
  // eslint-disable-next-line no-unused-vars
  function handleUserRegisteredOpen() {
    setIsUserRegisteredPopupOpen(true);
  }
  function closeAllPopups() {
    setIsLoginPopupOpen(false);
    setIsUserRegisteredPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setIsMenuMobileOpen(false);
    setIsButtonMenuActive(false);
  }
  function closePopupByEscAndOverlay() {
    function handleEscClose(e) {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    function closeByOverlay(e) {
      if (e.target.classList.contains('popup_open') || e.target.classList.contains('menu_open')) {
        closeAllPopups();
      }
    }

    document.addEventListener('click', closeByOverlay);
    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('click', closeByOverlay);
    };
  }
  /** мобильное меню  */
  function handleMenuMobile() {
    setIsMenuMobileOpen(!isMenuMobileOpen);
  }
  function handleMenuButtonMobile() {
    setIsButtonMenuActive(!isButtonMenuActive);
  }
  function isHiddenHeaderButton() {
    let isHidden;
    if (isRegisterPopupOpen || isLoginPopupOpen) {
      isHidden = true;
    } else {
      isHidden = false;
    }
    return isHidden;
  }
  /** работа со статьями */
  function changeDateFormat(date) {
    const newDate = date.split('T')[0].split('-').reverse();
    const newMonth = `${monthNames[Number(newDate[1]) - 1]},`;
    newDate.splice(1, 1, newMonth);
    return newDate.join(' ');
  }
  /** сабмит для формы поиска новостей  */
  function handleSearchFormSubmit(value) {
    setIsNewsCardListVisible(true);
    setIsPreloaderVisible(true);
    newsApi.getArticles(value).then((res) => {
      const articles = res.articles.map((item) => ({
        keyword: value,
        title: item.title,
        text: item.description,
        date: changeDateFormat(item.publishedAt),
        source: item.source.name,
        link: item.url,
        image: item.urlToImage,
      }));
      const firstArticles = articles.splice(0, 3);
      setCurrentArticles(firstArticles);
      setAdditionalArticles(articles);
    })
      // eslint-disable-next-line no-console
      .catch((err) => console.error(`При запросе статей произошла ошибка: ${err}`))
      .finally(() => setIsPreloaderVisible(false));
  }
  function handleShowMoreButton() {
    if (additionalArticles.length > 0) {
      setIsPreloaderVisible(true);
      const moreArticles = additionalArticles.splice(0, 3);
      setCurrentArticles([...currentArticles, ...moreArticles]);
      setIsPreloaderVisible(false);
    }
  }
  return (
    <div className="app">
      <Header
        pathname={location.pathname}
        isLoggedIn={isUserLoggedIn}
        openLoginPopup={handleLoginPopupOpen}
        isMenu={false}
        handleMenu={handleMenuMobile}
        isButtonActive={isButtonMenuActive}
        handleButtonMenu={handleMenuButtonMobile}
        isHiddenHeaderButton={isHiddenHeaderButton()}
        closeMenu={closeAllPopups}
      />
      <Switch>
        <Route path="/saved-news">
          <SavedNews cards={dataSave} isLoggedIn={isUserLoggedIn} />
        </Route>
        <Route path="/">
          <Main
            articles={currentArticles}
            isLoggedIn={isUserLoggedIn}
            handleSearchFormSubmit={handleSearchFormSubmit}
            isNewsCardListVisible={isNewsCardListVisible}
            isPreloaderVisible={isPreloaderVisible}
            handleShowMoreButton={handleShowMoreButton}
          />
        </Route>

      </Switch>
      <Footer />
      <LoginPopup
        isOpen={isLoginPopupOpen}
        closeByEscAndOverlay={closePopupByEscAndOverlay}
        onClose={() => setIsLoginPopupOpen(false)}
        openRegisterPopup={handleRegisterPopupOpen}
      />
      <RegisterPopup
        isOpen={isRegisterPopupOpen}
        closeByEscAndOverlay={closePopupByEscAndOverlay}
        onClose={() => setIsRegisterPopupOpen(false)}
        openLoginPopup={handleLoginPopupOpen}
      />
      <UserRegisteredMessagePopup
        isOpen={isUserRegisteredPopupOpen}
        closeByEscAndOverlay={closePopupByEscAndOverlay}
        onClose={() => setIsUserRegisteredPopupOpen(false)}
        openLoginPopup={handleLoginPopupOpen}
      />
      <MobileMenu
        isOpen={isMenuMobileOpen}
        pathname={location.pathname}
        isLoggedIn={isUserLoggedIn}
        openLoginPopup={handleLoginPopupOpen}
        handleMenu={handleMenuMobile}
        isButtonActive={isButtonMenuActive}
        handleButtonMenu={handleMenuButtonMobile}
        closeByEscAndOverlay={closePopupByEscAndOverlay}
        isHiddenHeaderButton={isHiddenHeaderButton()}
        closeMenu={closeAllPopups}
      />
    </div>
  );
}

export default App;
