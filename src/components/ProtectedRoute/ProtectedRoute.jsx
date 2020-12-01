import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, isUserLoggedIn, ...props }) => (
  <Route>
    {
        isUserLoggedIn ? <Component isLoggedIn={isUserLoggedIn} {...props} /> : <Redirect to="./" />
      }
  </Route>
);

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
};

export default ProtectedRoute;
