import React from 'react';
import PT from 'prop-types';

import { Wrapper } from './styles';

function DefaultLayout({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

DefaultLayout.propTypes = {
  children: PT.element.isRequired,
};

export default DefaultLayout;
