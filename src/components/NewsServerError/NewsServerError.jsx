import React from 'react';
import './NewsServerError.css';
import { NEWS_SERVER_ERROR_MESSAGE } from '../../utils/constants';

function NewsServerError() {
  return (
    <div className="error">
      <p className="error__description">
        {NEWS_SERVER_ERROR_MESSAGE}
      </p>
    </div>
  );
}

export default NewsServerError;
