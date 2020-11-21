import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Navigation.css';
import NavButton from '../NavButton/NavButton';

function Navigation({ isLoggedIn, pathname, openLoginPopup }) {
  return (
    <nav className="navigation">
      <Link
        to="/"
        className={`navigation__link ${pathname === '/' ? 'navigation__link_active_white navigation__link_white' : 'navigation__link_black'}`}
      >
        Главная
      </Link>
      {isLoggedIn
      && (
      <Link
        to="/saved-news"
        className={`navigation__link ${pathname === '/saved-news' ? 'navigation__link_active_black navigation__link_black' : 'navigation__link_white'}`}
      >
        Сохраненные статьи
      </Link>
      )}
      <NavButton isLoggedIn={isLoggedIn} pathname={pathname} openLoginPopup={openLoginPopup} />
    </nav>

  );
}

Navigation.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  pathname: PropTypes.string.isRequired,
  openLoginPopup: PropTypes.func.isRequired,
};

export default Navigation;
