import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import NavButton from '../NavButton/NavButton';

function Navigation() {
  return (
    <nav className="navigation">
      <Link to="/" className="navigation__link">Главная</Link>
      {/* <Link to="/" className="navigation__link">Сохраненные статьи</Link>
      <Link to="/" className="navigation__link">Сохраненные статьи</Link>
      <Link to="/" className="navigation__link">Сохраненные статьи</Link> */}
      <NavButton />
    </nav>

  );
}

export default Navigation;
