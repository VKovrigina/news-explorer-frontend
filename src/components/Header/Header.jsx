import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import HeaderLogoWhite from '../../images/Logo-white.svg';
import Navigation from '../Navigation/Navigation';
import HeaderLogoBlack from '../../images/Logo-black.svg';

function Header({ pathname, isLoggedIn }) {
  const [isButtonActive, setIsButtonActive] = React.useState(false);
  function headerClasses() {
    let classes = 'header';
    if (pathname === '/') {
      classes += ' header_bg_img';
    } else {
      classes += ' header_bg_white';
    }
    return classes;
  }
  return (
    <header className={headerClasses()}>
      <div className="header__container">
        <img className="header__logo" alt="" src={`${pathname === '/' ? HeaderLogoWhite : HeaderLogoBlack}`} />
        <span
          className={`header__burger-button ${pathname === '/' ? 'header__burger-button_white' : 'header__burger-button_black'} ${isButtonActive ? 'header__burger-button_active' : ''}`}
          onClick={() => setIsButtonActive(!isButtonActive)}
          role="button"
          aria-hidden="true"
        />
        <Navigation isLoggedIn={isLoggedIn} pathname={pathname} />
      </div>
    </header>

  );
}

Header.propTypes = {
  pathname: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Header;
