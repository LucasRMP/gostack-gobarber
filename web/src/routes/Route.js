import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PT from 'prop-types';

import AuthLayout from '~/pages/_layouts/auth';
import DefaultLayout from '~/pages/_layouts/default';

import { store } from '~/store';

function RouteWrapper({ component: Component, isPrivate, ...rest }) {
  const { signed } = store.getState().auth;

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

  const Layout = !signed ? AuthLayout : DefaultLayout;

  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PT.bool,
  component: PT.oneOfType([PT.element, PT.func]).isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};

export default RouteWrapper;
