import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import HeaderLogoWhite from '../../images/Logo-white';
/** import Navigation from '../Navigation/Navigation'; */

function Header({
  pathname,
  isHiddenHeaderButton, isMenu, handleMenu, isButtonActive, handleButtonMenu,
}) {
  function headerClasses() {
    let classes = 'header';
    if (pathname === '/' && !isMenu) {
      classes += ' header_bg_img header_position_fixed';
    } else if (pathname !== '/' && !isMenu) {
      classes += ' header_bg_white header_position_fixed';
    } else if (pathname === '/' && isMenu) {
      classes += ' header_bg_dark header_position_relative';
    } else if (pathname !== '/' && isMenu) {
      classes += ' header_bg_white header_position_relative';
    }
    return classes;
  }
  function onClick() {
    handleButtonMenu();
    handleMenu();
  }
  return (
    <header className={headerClasses()}>
      <div className="header__container">
        <HeaderLogoWhite />
        {/* <img className="header__logo" alt=""
        src={`${pathname === '/' ? HeaderLogoWhite : HeaderLogoBlack}`} /> */}
        {!isHiddenHeaderButton
        && (
          <span
            className={`header__burger-button ${pathname === '/' ? 'header__burger-button_white' : 'header__burger-button_black'} ${isButtonActive ? 'header__burger-button_active' : ''}`}
            onClick={onClick}
            role="button"
            aria-hidden="true"
          />
        )}
        {/* {!isMenu
        && (
          <Navigation
            isLoggedIn={isLoggedIn}
            pathname={pathname}
            openLoginPopup={openLoginPopup}
            isMenu={isMenu}
            closeMenu={closeMenu}
            onExit={onExit}
          />
        )} */}
      </div>
    </header>

  );
}

Header.propTypes = {
  pathname: PropTypes.string.isRequired,
  isMenu: PropTypes.bool.isRequired,
  handleMenu: PropTypes.func.isRequired,
  isButtonActive: PropTypes.bool.isRequired,
  handleButtonMenu: PropTypes.func.isRequired,
  isHiddenHeaderButton: PropTypes.bool.isRequired,
};

export default Header;
