import React from 'react';
import './NewsServerError.css';
import { newsServerErrorMessage } from '../../utils/constants';

function NewsServerError() {
  return (
    <div className="error">
      <p className="error__description">
        {newsServerErrorMessage}
      </p>
    </div>
  );
}

export default NewsServerError;
