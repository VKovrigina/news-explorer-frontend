import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({
  component: Component, isUserLoggedIn, openLoginPopup, ...props
}) => {
  React.useEffect(() => {
    if (!isUserLoggedIn) {
      openLoginPopup();
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
};

export default ProtectedRoute;
