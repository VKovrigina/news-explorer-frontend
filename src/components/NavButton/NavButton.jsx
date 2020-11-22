import React from 'react';
import PropTypes from 'prop-types';
import './NavButton.css';
import ExitIconBlack from '../../images/Union-exit-black.svg';
import ExitIconWhite from '../../images/Union-exit-white.svg';

function NavButton({
  isLoggedIn, pathname, openLoginPopup, isMenu,
}) {
  function onClickFunction() {
    if (!isLoggedIn) {
      openLoginPopup();
    }
  }
  return (
    <button type="button" onClick={onClickFunction} className={`nav-button ${pathname === '/' ? 'nav-button_type_white' : 'nav-button_type_black'} ${isMenu ? 'nav-button_mobile' : ''}`}>
      {isLoggedIn
        ? (
          <>
            <p className={`nav-button__text ${pathname === '/' ? 'nav-button__text_type_white' : 'nav-button__text_type_black'}`}>Имя пользователя</p>
            <img className="nav-button__icon" alt="" src={`${pathname === '/' ? ExitIconWhite : ExitIconBlack}`} />
          </>
        )
        : <p className={`nav-button__text ${pathname === '/' ? 'nav-button__text_type_white' : 'nav-button__text_type_black'}`}>Авторизоваться</p>}
    </button>
  );
}

NavButton.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  pathname: PropTypes.string.isRequired,
  openLoginPopup: PropTypes.func.isRequired,
  isMenu: PropTypes.bool.isRequired,
};

export default NavButton;
