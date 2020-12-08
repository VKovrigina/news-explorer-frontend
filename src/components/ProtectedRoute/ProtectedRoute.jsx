import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({
  component: Component, isUserLoggedIn, openLoginPopup, updateSavedArticles, ...props
}) => {
  React.useEffect(() => {
    if (!isUserLoggedIn) {
      openLoginPopup();
    }
    if (isUserLoggedIn) {
      updateSavedArticles();
    }
  }, []);
  return (
    <Route>
      {
        isUserLoggedIn ? <Component isLoggedIn={isUserLoggedIn} {...props} /> : <Redirect to="./" />
      }
    </Route>
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  openLoginPopup: PropTypes.func.isRequired,
  updateSavedArticles: PropTypes.func.isRequired,
};

export default ProtectedRoute;
