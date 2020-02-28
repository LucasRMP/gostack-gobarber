import React from 'react';

import Background from '~/components/Background';

import { Container } from './styles';

function SelectProvider() {
  return (
    <Background>
      <Container />
    </Background>
  );
}

SelectProvider.navigationOptions = {
  title: 'Selecione um prestador',
};

export default SelectProvider;
