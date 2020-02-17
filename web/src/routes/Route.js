import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PT from 'prop-types';

function RouteWrapper({ component: Component, isPrivate, ...rest }) {
  console.tron.log(rest);

  const signed = false;

  /**
   * If user is trying to access a private route without credentials,
   * send him back to the login page
   */
  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  /**
   * If user is trying to access the login page with alredy valid credentials,
   * send him to dashboard page
   */
  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  return <Route {...rest} component={Component} />;
}

RouteWrapper.propTypes = {
  isPrivate: PT.bool,
  component: PT.oneOfType([PT.element, PT.func]).isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};

export default RouteWrapper;
