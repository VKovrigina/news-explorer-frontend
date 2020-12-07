import React from 'react';
import {
  Route, Switch, useLocation, Redirect,
} from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import LoginPopup from '../LoginPopup/LoginPopup';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import UserRegisteredMessagePopup from '../UserRegisteredMessagePopup/UserRegisteredMessagePopup';
import ErrorPopup from '../ErrorPopup/ErrorPopup';
import MobileMenu from '../MobileMenu/MobileMenu';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import newsApi from '../../utils/NewsApi';
import mainApi from '../../utils/MainApi';
import { MONTH_NAMES, SERVER_ERROR_MESSAGE, COUNT_NEW_ARTICLES } from '../../utils/constants';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function App() {
  const location = useLocation();
  const [isUserLoggedIn, setUserLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  /** попапы  */
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [isUserRegisteredPopupOpen, setIsUserRegisteredPopupOpen] = React.useState(false);
  const [isErrorPopupOpen, setErrorPopupOpen] = React.useState(false);
  const [popupErrorText, setPopupErrorText] = React.useState('');
  const [registerErrorMessage, setRegisterErrorMessage] = React.useState('');
  const [loginErrorMessage, setLoginErrorMessage] = React.useState('');
  /** мобильное меню  */
  const [isMenuMobileOpen, setIsMenuMobileOpen] = React.useState(false);
  const [isButtonMenuActive, setIsButtonMenuActive] = React.useState(false);
  /** статьи  */
  const [currentArticles, setCurrentArticles] = React.useState(JSON.parse(localStorage.getItem('currentArticles')) || []);
  const [additionalArticles, setAdditionalArticles] = React.useState(JSON.parse(localStorage.getItem('additionalArticles')) || []);
  const [savedArticles, setSavedArticles] = React.useState([]);
  /** другое */
  const [isNewsCardListVisible, setIsNewsCardListVisible] = React.useState(JSON.parse(localStorage.getItem('isNewsCardListVisible')) || false);
  const [isPreloaderVisible, setIsPreloaderVisible] = React.useState(false);
  const [isNewsServerError, setNewsServerError] = React.useState(false);
  const [isFormLoading, setFormLoading] = React.useState(false);
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
    setLoginErrorMessage('');
  }
  function handleRegisterPopupOpen() {
    setIsRegisterPopupOpen(true);
    setRegisterErrorMessage('');
  }
  function closeAllPopups() {
    setIsLoginPopupOpen(false);
    setIsUserRegisteredPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setErrorPopupOpen(false);
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
  /* работа с пользователем * */
  function handleRegistration(userName, userEmail, userPassword) {
    setFormLoading(true);
    mainApi.register(userName, userEmail, userPassword)
      .then(() => {
        setRegisterErrorMessage('');
        setIsRegisterPopupOpen(false);
        setIsUserRegisteredPopupOpen(true);
      })
      .catch((err) => {
        try {
          err.then((res) => {
            if (res.statusCode === 400) {
              setRegisterErrorMessage(res.validation.body.message);
            } else {
              setRegisterErrorMessage(res.message);
            }
          });
        } catch {
          setRegisterErrorMessage(SERVER_ERROR_MESSAGE);
        }
      })
      .finally(() => {
        setFormLoading(false);
      });
  }
  function handleLogin(userEmail, userPassword) {
    setFormLoading(true);
    mainApi.login(userEmail, userPassword)
      .then(() => {
        setUserLoggedIn(true);
        setLoginErrorMessage('');
        setIsLoginPopupOpen(false);
      })
      .catch((err) => {
        try {
          err.then((res) => {
            if (res.statusCode === 400) {
              setLoginErrorMessage(res.validation.body.message);
            } else {
              setLoginErrorMessage(res.message);
            }
          });
        } catch {
          setLoginErrorMessage(SERVER_ERROR_MESSAGE);
        }
      })
      .finally(() => {
        setFormLoading(false);
      });
  }
  function handleExit() {
    mainApi.logout()
      .then(() => {
        setUserLoggedIn(false);
        localStorage.removeItem('additionalArticles');
        localStorage.removeItem('currentArticles');
        localStorage.removeItem('keyword');
        localStorage.removeItem('isNewsCardListVisible');
      })
      .catch((err) => {
        try {
          err.then((res) => {
            setPopupErrorText(res.message || SERVER_ERROR_MESSAGE);
            setErrorPopupOpen(true);
          });
        } catch {
          setPopupErrorText(SERVER_ERROR_MESSAGE);
          setErrorPopupOpen(true);
        }
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
          });
          setSavedArticles(articlesInfo.data);
        }
      })
      .catch(() => {
        setUserLoggedIn(false);
      });
  }, [isUserLoggedIn]);
  /** работа со статьями */
  function handleSaveArticle(
    title,
    text,
    date,
    source,
    link,
    image,
  ) {
    mainApi.createArticle(
      title,
      text,
      date,
      source,
      link,
      image,
    )
      .then((res) => {
        const newArticle = res.data;
        // eslint-disable-next-line max-len
        const newArticles = currentArticles.map((item) => (item.link === link ? newArticle : item));
        setCurrentArticles(newArticles);
        localStorage.setItem('currentArticles', JSON.stringify(newArticles));
      })
      .catch((err) => {
        try {
          err.then((res) => {
            if (res.statusCode === 400) {
              setPopupErrorText(res.validation.body.message || SERVER_ERROR_MESSAGE);
            } else {
              setPopupErrorText(res.message || SERVER_ERROR_MESSAGE);
            }
            setErrorPopupOpen(true);
          });
        } catch {
          setPopupErrorText(SERVER_ERROR_MESSAGE);
          setErrorPopupOpen(true);
        }
      });
  }
  function updateSavedArticles() {
    mainApi.getSavedArticles()
      .then((articlesInfo) => {
        setSavedArticles(articlesInfo.data);
      })
      .catch((err) => {
        try {
          err.then((res) => {
            setPopupErrorText(res.message || SERVER_ERROR_MESSAGE);
            setErrorPopupOpen(true);
          });
        } catch {
          setPopupErrorText(SERVER_ERROR_MESSAGE);
          setErrorPopupOpen(true);
        }
      });
  }
  function handleDeleteArticle(id) {
    mainApi.deleteArticleById(id)
      .then(() => {
        const newSavedArticles = savedArticles.filter((item) => item._id !== id);
        setSavedArticles(newSavedArticles);
        const currArticlesId = currentArticles.map((item) => item._id);
        /** проверяем по id, есть ли на главной странице удаляемая карточка */
        if (currArticlesId.includes(id)) {
          /** если есть - заменяем ее на другую, без id */
          const deletedArticle = currentArticles.find((item) => item._id === id);
          const newArticle = {
            keyword: deletedArticle.keyword,
            title: deletedArticle.title,
            text: deletedArticle.text,
            date: deletedArticle.date,
            source: deletedArticle.source,
            link: deletedArticle.link,
            image: deletedArticle.image,
          };
          // eslint-disable-next-line max-len
          const newCurrArticles = currentArticles.map((item) => (item._id === id ? newArticle : item));
          setCurrentArticles(newCurrArticles);
          localStorage.setItem('currentArticles', JSON.stringify(newCurrArticles));
        }
      })
      .catch((err) => {
        try {
          err.then((res) => {
            if (res.statusCode === 400) {
              setPopupErrorText(res.validation.params.message || SERVER_ERROR_MESSAGE);
            } else {
              setPopupErrorText(res.message || SERVER_ERROR_MESSAGE);
            }
            setErrorPopupOpen(true);
          });
        } catch {
          setPopupErrorText(SERVER_ERROR_MESSAGE);
          setErrorPopupOpen(true);
        }
      });
  }
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
          onExit={handleExit}
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
              saveArticle={handleSaveArticle}
              deleteArticle={handleDeleteArticle}
              isNewsApiError={isNewsServerError}
              isFormLoading={isFormLoading}
            />
          </Route>
          <ProtectedRoute
            path="/saved-news"
            component={SavedNews}
            isUserLoggedIn={isUserLoggedIn}
            articles={savedArticles}
            openLoginPopup={handleLoginPopupOpen}
            updateSavedArticles={updateSavedArticles}
            deleteArticle={handleDeleteArticle}
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
          isLoading={isFormLoading}
        />
        <RegisterPopup
          isOpen={isRegisterPopupOpen}
          closeByEscAndOverlay={closePopupByEscAndOverlay}
          onClose={closeAllPopups}
          openLoginPopup={handleLoginPopupOpen}
          registerErrorMessage={registerErrorMessage}
          onSubmit={handleRegistration}
          isLoading={isFormLoading}
        />
        <UserRegisteredMessagePopup
          isOpen={isUserRegisteredPopupOpen}
          closeByEscAndOverlay={closePopupByEscAndOverlay}
          onClose={closeAllPopups}
          openLoginPopup={handleLoginPopupOpen}
        />
        <ErrorPopup
          isOpen={isErrorPopupOpen}
          closeByEscAndOverlay={closePopupByEscAndOverlay}
          onClose={closeAllPopups}
          errorText={popupErrorText}
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
          onExit={handleExit}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
