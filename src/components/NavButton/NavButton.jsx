import React from 'react';
import PropTypes from 'prop-types';
import './NavButton.css';
// import ExitIconBlack from '../../images/Union-exit-black.svg';
import ExitIconWhite from '../../images/Union-exit-white.svg';

function NavButton({ isLoggedIn }) {
  return (
    <button type="button" className="nav-button">
      {isLoggedIn
        ? (
          <>
            <p className="nav-button__text">Имя пользователя</p>
            <img className="nav-button__icon" alt="" src={ExitIconWhite} />
          </>
        )
        : <p className="nav-button__text">Авторизоваться</p>}
    </button>
  );
}

NavButton.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default NavButton;
