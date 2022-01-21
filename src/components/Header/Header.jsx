import React from 'react';
import './Header.css';
import HeaderLogoWhite from '../../images/Logo-white';

function Header() {
  return (
    <header className="header header_bg_img header_position_fixed">
      <div className="header__container">
        <HeaderLogoWhite />
      </div>
    </header>

  );
}

export default Header;
