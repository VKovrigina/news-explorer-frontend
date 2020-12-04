import React from 'react';
import {
  Route, Switch, useLocation, Redirect,
} from 'react-router-dom';
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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import newsApi from '../../utils/NewsApi';
import mainApi from '../../utils/MainApi';
import { monthNames } from '../../utils/constants';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function App() {
  const location = useLocation();
  const [isUserLoggedIn, setUserLoggedIn] = React.useState(false);
  // eslint-disable-next-line no-unused-vars
  const [currentUser, setCurrentUser] = React.useState({});
  /** попапы  */
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [isUserRegisteredPopupOpen, setIsUserRegisteredPopupOpen] = React.useState(false);
  const [registerErrorMessage, setRegisterErrorMessage] = React.useState('');
  const [loginErrorMessage, setLoginErrorMessage] = React.useState('');
  /** мобильное меню  */
  const [isMenuMobileOpen, setIsMenuMobileOpen] = React.useState(false);
  const [isButtonMenuActive, setIsButtonMenuActive] = React.useState(false);
  /** статьи  */
  const [currentArticles, setCurrentArticles] = React.useState(JSON.parse(localStorage.getItem('currentArticles')) || []);
  const [additionalArticles, setAdditionalArticles] = React.useState(JSON.parse(localStorage.getItem('additionalArticles')) || []);
  // eslint-disable-next-line no-unused-vars
  const [savedArticles, setSavedArticles] = React.useState(dataSave || []);
  const [isNewsCardListVisible, setIsNewsCardListVisible] = React.useState(JSON.parse(localStorage.getItem('isNewsCardListVisible')) || false);
  const [isPreloaderVisible, setIsPreloaderVisible] = React.useState(false);
  /** мобильное меню  */
  function handleCloseMenu() {
    setIsMenuMobileOpen(false);
    setIsButtonMenuActive(false);
  }
  function handleMenuMobile() {
    setIsMenuMobileOpen(!isMenuMobileOpen);
  }
  function handleMenuButtonMobile() {
    setIsButtonMenuActive(!isButtonMenuActive);
  }
  function isHiddenHeaderButton() {
    let isHidden;
    if (isRegisterPopupOpen || isLoginPopupOpen || isUserRegisteredPopupOpen) {
      isHidden = true;
    } else {
      isHidden = false;
    }
    return isHidden;
  }
  /** попапы  */
  function handleLoginPopupOpen() {
    setIsLoginPopupOpen(true);
  }
  function handleRegisterPopupOpen() {
    setIsRegisterPopupOpen(true);
    setRegisterErrorMessage('');
  }
  function closeAllPopups() {
    setIsLoginPopupOpen(false);
    setIsUserRegisteredPopupOpen(false);
    setIsRegisterPopupOpen(false);
  }
  function closePopupByEscAndOverlay() {
    function handleEscClose(e) {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    function closeByOverlay(e) {
      if (e.target.classList.contains('popup_open')) {
        closeAllPopups();
      }
      if (e.target.classList.contains('menu_open')) {
        handleCloseMenu();
      }
    }

    document.addEventListener('click', closeByOverlay);
    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('click', closeByOverlay);
    };
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
    localStorage.setItem('keyword', JSON.stringify(value));
    localStorage.setItem('isNewsCardListVisible', JSON.stringify(true));
    setCurrentArticles([]);
    setAdditionalArticles([]);
    setIsPreloaderVisible(true);
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
        const firstArticles = articles.splice(0, 3);
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
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(`При запросе статей произошла ошибка: ${err}`);
        localStorage.removeItem('additionalArticles');
        localStorage.removeItem('currentArticles');
        localStorage.removeItem('keyword');
        localStorage.removeItem('isNewsCardListVisible');
      })
      .finally(() => setIsPreloaderVisible(false));
  }
  function handleShowMoreButton() {
    if (additionalArticles.length > 0) {
      const moreArticles = additionalArticles.splice(0, 3);
      setCurrentArticles([...currentArticles, ...moreArticles]);
      localStorage.setItem('currentArticles', JSON.stringify([...currentArticles, ...moreArticles]));
      localStorage.setItem('additionalArticles', JSON.stringify(additionalArticles));
    } else {
      localStorage.removeItem('additionalArticles');
    }
  }
  /* работа с пользователем * */
  function handleRegistration(userName, userEmail, userPassword) {
    mainApi.register(userName, userEmail, userPassword)
      .then(() => {
        setRegisterErrorMessage('');
        setIsRegisterPopupOpen(false);
        setIsUserRegisteredPopupOpen(true);
      })
      .catch((err) => {
        err.then((res) => {
          if (res.statusCode === 400) {
            setRegisterErrorMessage(res.validation.body.message);
          } else {
            setRegisterErrorMessage(res.message);
          }
        });
      });
  }
  function handleLogin(userEmail, userPassword) {
    mainApi.login(userEmail, userPassword)
      .then(() => {
        setUserLoggedIn(true);
        setLoginErrorMessage('');
        setIsLoginPopupOpen(false);
      })
      .catch((err) => {
        err.then((res) => {
          setLoginErrorMessage(res.message);
        });
      });
  }
  React.useEffect(() => {
    Promise.all([mainApi.getContent(), mainApi.getSavedArticles()])
      .then(([userInfo, articlesInfo]) => {
        if (userInfo) {
          setUserLoggedIn(true);
          setCurrentUser({
            _id: userInfo._id,
            name: userInfo.name,
            email: userInfo.email,
            savedArticles: articlesInfo.data,
          });
        }
      })
      .catch(() => {
        setUserLoggedIn(false);
      });
  }, [isUserLoggedIn]);
  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
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
          <Route exact path="/">
            <Main
              articles={currentArticles}
              additionalArticles={additionalArticles}
              isLoggedIn={isUserLoggedIn}
              handleSearchFormSubmit={handleSearchFormSubmit}
              isNewsCardListVisible={isNewsCardListVisible}
              isPreloaderVisible={isPreloaderVisible}
              handleShowMoreButton={handleShowMoreButton}
            />
          </Route>
          <ProtectedRoute
            path="/saved-news"
            component={SavedNews}
            isUserLoggedIn={isUserLoggedIn}
            articles={savedArticles}
          />
          <Route>
            <Redirect to="/" />
          </Route>

        </Switch>
        <Footer />
        <LoginPopup
          isOpen={isLoginPopupOpen}
          closeByEscAndOverlay={closePopupByEscAndOverlay}
          onClose={closeAllPopups}
          openRegisterPopup={handleRegisterPopupOpen}
          loginErrorMessage={loginErrorMessage}
          onSubmit={handleLogin}
        />
        <RegisterPopup
          isOpen={isRegisterPopupOpen}
          closeByEscAndOverlay={closePopupByEscAndOverlay}
          onClose={closeAllPopups}
          openLoginPopup={handleLoginPopupOpen}
          registerErrorMessage={registerErrorMessage}
          onSubmit={handleRegistration}
        />
        <UserRegisteredMessagePopup
          isOpen={isUserRegisteredPopupOpen}
          closeByEscAndOverlay={closePopupByEscAndOverlay}
          onClose={closeAllPopups}
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
          closeMenu={handleCloseMenu}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
