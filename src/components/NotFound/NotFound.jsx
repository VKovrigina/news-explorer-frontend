import React from 'react';
import PropTypes from 'prop-types';
import NotFoundIcon from '../../images/not-found';
import './NotFound.css';

function NotFound({ isMainPage }) {
  return (
    <div className="not-found">
      <img alt="Ничего не найдено" src={NotFoundIcon} />
      <p className="not-found__title">Ничего не найдено</p>
      <p className="not-found__description">
        {`${isMainPage ? 'К сожалению по вашему запросу ничего не найдено.' : 'У вас пока что нет сохраненных статей...'}`}
      </p>
    </div>
  );
}

NotFound.propTypes = {
  isMainPage: PropTypes.bool.isRequired,
};

export default NotFound;
