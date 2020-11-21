import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import { dataMain, dataSave } from '../../utils/data';
import LoginPopup from '../LoginPopup/LoginPopup';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import UserRegisteredMessagePopup from '../UserRegisteredMessagePopup/UserRegisteredMessagePopup';

function App() {
  const location = useLocation();
  // eslint-disable-next-line no-unused-vars
  const [isUserLoggedIn, setUserLoggedIn] = React.useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [isUserRegisteredPopupOpen, setIsUserRegisteredPopupOpen] = React.useState(true);
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
    }

    document.addEventListener('click', closeByOverlay);
    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('click', closeByOverlay);
    };
  }
  return (
    <div className="app">
      <Header
        pathname={location.pathname}
        isLoggedIn={isUserLoggedIn}
        openLoginPopup={handleLoginPopupOpen}
      />
      <Switch>
        <Route path="/saved-news">
          <SavedNews cards={dataSave} isLoggedIn={isUserLoggedIn} />
        </Route>
        <Route path="/">
          <Main cards={dataMain} isLoggedIn={isUserLoggedIn} />
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
    </div>
  );
}

export default App;
