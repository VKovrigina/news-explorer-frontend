import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="navigation">
      <Link to="/" className="navigation__link">Главная</Link>
      <Link to="/" className="navigation__link">Сохраненные статьи</Link>
      <button type="button" className="navigation__button">Авторизоваться</button>
    </nav>

  );
}

export default Navigation;
