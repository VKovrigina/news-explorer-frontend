import React from 'react';
import './Header.css';
import HeaderLogoWhite from '../../images/Logo-white.svg';
// import HeaderLogoBlack from '../../images/Logo-black.svg';

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" alt="" src={HeaderLogoWhite} />
        <div className="header__burger-button header__burger-button_active" />
      </div>
    </header>

  );
}

export default Header;
