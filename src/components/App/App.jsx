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

function App() {
  const location = useLocation();
  // eslint-disable-next-line no-unused-vars
  const [isUserLoggedIn, setUserLoggedIn] = React.useState(false);
  const [openedPopup, setOpenedPopup] = React.useState({});
  function handleLoginPopupOpen() {
    setOpenedPopup({ isLoginPopupOpen: true });
  }
  function handleRegisterPopupOpen() {
    setOpenedPopup({ isRegisterPopupOpen: true });
  }
  function closeAllPopups() {
    setOpenedPopup({ isLoginPopupOpen: false });
    setOpenedPopup({ isRegisterPopupOpen: false });
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
        isOpen={openedPopup.isLoginPopupOpen}
        closeByEscAndOverlay={closePopupByEscAndOverlay}
        onClose={() => setOpenedPopup({ isLoginPopupOpen: false })}
        openRegisterPopup={handleRegisterPopupOpen}
      />
      <RegisterPopup
        isOpen={openedPopup.isRegisterPopupOpen}
        closeByEscAndOverlay={closePopupByEscAndOverlay}
        onClose={() => setOpenedPopup({ isRegisterPopupOpen: false })}
        openLoginPopup={handleLoginPopupOpen}
      />
    </div>
  );
}

export default App;
