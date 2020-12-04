import React from 'react';
import PropTypes from 'prop-types';
import './NavButton.css';
import ExitIconBlack from '../../images/Union-exit-black.svg';
import ExitIconWhite from '../../images/Union-exit-white.svg';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function NavButton({
  isLoggedIn, pathname, openLoginPopup, isMenu, onExit,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  function onClickFunction() {
    if (!isLoggedIn) {
      openLoginPopup();
    } else {
      onExit();
    }
  }
  return (
    <button type="button" onClick={onClickFunction} className={`nav-button ${pathname === '/' ? 'nav-button_type_white' : 'nav-button_type_black'} ${isMenu ? 'nav-button_mobile' : ''}`}>
      {isLoggedIn
        ? (
          <>
            <span className={`nav-button__text ${pathname === '/' ? 'nav-button__text_type_white' : 'nav-button__text_type_black'}`}>{currentUser.name}</span>
            <img className="nav-button__icon" alt="" src={`${pathname === '/' ? ExitIconWhite : ExitIconBlack}`} />
          </>
        )
        : <span className={`nav-button__text ${pathname === '/' ? 'nav-button__text_type_white' : 'nav-button__text_type_black'}`}>Авторизоваться</span>}
    </button>
  );
}

NavButton.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  pathname: PropTypes.string.isRequired,
  openLoginPopup: PropTypes.func.isRequired,
  isMenu: PropTypes.bool.isRequired,
  onExit: PropTypes.func.isRequired,
};

export default NavButton;
