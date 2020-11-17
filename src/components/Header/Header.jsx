import React from 'react';
import './Header.css';
import HeaderLogoWhite from '../../images/Logo-white.svg';
import Navigation from '../Navigation/Navigation';
// import HeaderLogoBlack from '../../images/Logo-black.svg';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" alt="" src={HeaderLogoWhite} />
        <div className="header__burger-button header__burger-button_active" />
        <Navigation isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </div>
    </header>

  );
}

export default Header;
