import React from 'react';
import PropTypes from 'prop-types';
import './MobileMenu.css';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';

function MobileMenu({
  isOpen,
  pathname,
  isLoggedIn,
  openLoginPopup,
  handleMenu,
  isButtonActive,
  handleButtonMenu,
  closeByEscAndOverlay,
  isHiddenHeaderButton,
  closeMenu,
}) {
  React.useEffect(() => {
    closeByEscAndOverlay();
  });
  return (
    <div className={`menu ${isOpen ? 'menu_open' : ''}`}>
      <Header
        pathname={pathname}
        isLoggedIn={isLoggedIn}
        isMenu
        handleMenu={handleMenu}
        openLoginPopup={openLoginPopup}
        isButtonActive={isButtonActive}
        handleButtonMenu={handleButtonMenu}
        isHiddenHeaderButton={isHiddenHeaderButton}
        closeMenu={closeMenu}
      />
      <div className={`menu__container ${pathname !== '/' ? 'menu__container_white' : ''}`}>
        <Navigation
          isLoggedIn={isLoggedIn}
          pathname={pathname}
          openLoginPopup={openLoginPopup}
          isMenu
          closeMenu={closeMenu}
        />
      </div>
    </div>
  );
}

MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  pathname: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  openLoginPopup: PropTypes.func.isRequired,
  handleMenu: PropTypes.func.isRequired,
  isButtonActive: PropTypes.bool.isRequired,
  handleButtonMenu: PropTypes.func.isRequired,
  closeByEscAndOverlay: PropTypes.func.isRequired,
  isHiddenHeaderButton: PropTypes.bool.isRequired,
  closeMenu: PropTypes.func.isRequired,
};

export default MobileMenu;
