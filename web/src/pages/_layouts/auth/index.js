import React from 'react';
import PT from 'prop-types';

import { Wrapper } from './styles';

function AuthLayout({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

AuthLayout.propTypes = {
  children: PT.element.isRequired,
};

export default AuthLayout;
