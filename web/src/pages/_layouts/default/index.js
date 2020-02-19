import React from 'react';
import PT from 'prop-types';

import Header from '~/components/Header';

import { Wrapper } from './styles';

function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <Header />
      {children}
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PT.element.isRequired,
};

export default DefaultLayout;
