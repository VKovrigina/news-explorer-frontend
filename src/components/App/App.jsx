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
import MobileMenu from '../MobileMenu/MobileMenu';

function App() {
  const location = useLocation();
  // eslint-disable-next-line no-unused-vars
  const [isUserLoggedIn, setUserLoggedIn] = React.useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [isUserRegisteredPopupOpen, setIsUserRegisteredPopupOpen] = React.useState(false);
  const [isMenuMobileOpen, setIsMenuMobileOpen] = React.useState(false);
  const [isButtonMenuActive, setIsButtonMenuActive] = React.useState(false);
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
