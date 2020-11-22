import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Navigation.css';
import NavButton from '../NavButton/NavButton';

function Navigation({
  isLoggedIn, pathname, openLoginPopup, isMenu,
}) {
  function mainLinkClasses() {
    let classes = 'navigation__link';
    if (pathname === '/' && !isMenu) {
      classes += ' navigation__link_active_white navigation__link_white';
    } else if (pathname !== '/' && !isMenu) {
      classes += ' navigation__link_black';
    } else if (pathname === '/' && isMenu) {
      classes += ' navigation__link_active_white-mobile navigation__link_white navigation__link_padding-none';
    } else if (pathname !== '/' && isMenu) {
      classes += ' navigation__link_black navigation__link_padding-none';
    }
    return classes;
  }
  function newsLinkClasses() {
    let classes = 'navigation__link';
    if (pathname === '/' && !isMenu) {
      classes += ' navigation__link_white';
    } else if (pathname === '/saved-news' && !isMenu) {
      classes += ' navigation__link_active_black navigation__link_black';
    } else if (pathname === '/saved-news' && isMenu) {
      classes += ' navigation__link_active_black-mobile navigation__link_black navigation__link_padding-none';
    } else if (pathname === '/' && isMenu) {
      classes += ' navigation__link_white navigation__link_padding-none';
    }
    return classes;
  }
  return (
    <nav className={`navigation ${isMenu ? 'navigation_mobile' : ''}`}>
      <Link
        to="/"
        className={mainLinkClasses()}
      >
        Главная
      </Link>
      {isLoggedIn
      && (
      <Link
        to="/saved-news"
        className={newsLinkClasses()}
      >
        Сохраненные статьи
      </Link>
      )}
      <NavButton
        isLoggedIn={isLoggedIn}
        pathname={pathname}
        openLoginPopup={openLoginPopup}
        isMenu={isMenu}
      />
    </nav>

  );
}

Navigation.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  pathname: PropTypes.string.isRequired,
  openLoginPopup: PropTypes.func.isRequired,
  isMenu: PropTypes.bool.isRequired,
};

export default Navigation;
