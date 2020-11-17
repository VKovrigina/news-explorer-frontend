import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Navigation.css';
import NavButton from '../NavButton/NavButton';

function Navigation({ isLoggedIn, setIsLoggedIn }) {
  const location = useLocation();
  return (
    <nav className="navigation">
      <Link
        to="/"
        className={`navigation__link navigation__link_white ${location.pathname === '/' ? 'navigation__link_active_white' : ''}`}
      >
        Главная
      </Link>
      {isLoggedIn
      && (
      <Link
        to="/"
        className="navigation__link navigation__link_white"
      >
        Сохраненные статьи
      </Link>
      )}
      <NavButton handlerClick={setIsLoggedIn} isLoggedIn={isLoggedIn} />
    </nav>

  );
}

Navigation.propTypes = {
  isLoggedIn: PropTypes.string.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default Navigation;
