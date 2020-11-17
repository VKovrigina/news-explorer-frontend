import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Navigation.css';
import NavButton from '../NavButton/NavButton';

function Navigation({ isLoggedIn, setIsLoggedIn }) {
  return (
    <nav className="navigation">
      <Link to="/" className="navigation__link">Главная</Link>
      {isLoggedIn && <Link to="/" className="navigation__link">Сохраненные статьи</Link>}
      <NavButton handlerClick={setIsLoggedIn} isLoggedIn={isLoggedIn} />
    </nav>

  );
}

Navigation.propTypes = {
  isLoggedIn: PropTypes.string.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default Navigation;
