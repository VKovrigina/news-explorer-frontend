import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import HeaderLogoWhite from '../../images/Logo-white';
/** import Navigation from '../Navigation/Navigation'; */

function Header({
  pathname, isMenu,
}) {
  function headerClasses() {
    let classes = 'header';
    if (pathname === '/' && !isMenu) {
      classes += ' header_bg_img header_position_fixed';
    } else if (pathname !== '/' && !isMenu) {
      classes += ' header_bg_white header_position_fixed';
    } else if (pathname === '/' && isMenu) {
      classes += ' header_bg_dark header_position_relative';
    } else if (pathname !== '/' && isMenu) {
      classes += ' header_bg_white header_position_relative';
    }
    return classes;
  }
  return (
    <header className={headerClasses()}>
      <div className="header__container">
        <HeaderLogoWhite />
      </div>
    </header>

  );
}

Header.propTypes = {
  pathname: PropTypes.string.isRequired,
  isMenu: PropTypes.bool.isRequired,
};

export default Header;
