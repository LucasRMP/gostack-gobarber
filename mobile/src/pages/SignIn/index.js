import React from 'react';
import { Text } from 'react-native';

import Input from '~/components/Input';
import Button from '~/components/Button';
import Background from '~/components/Background';
// import { Container } from './styles';

function SignIn() {
  return (
    <Background>
      <Text>SignIn</Text>
      <Input style={{ marginTop: 30 }} icon="call" placeholder="Nome" />
      <Button>Hello</Button>
    </Background>
  );
}

export default SignIn;
