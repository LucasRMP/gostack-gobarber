import React, { forwardRef } from 'react';
import PT from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, TInput } from './styles';

const Input = forwardRef(({ style, icon, ...rest }, ref) => {
  return (
    <Container style={style}>
      {icon && <Icon name={icon} size={20} color="rgba(255,255,255,.5)" />}
      <TInput {...rest} ref={ref} />
    </Container>
  );
});

Input.propTypes = {
  style: PT.oneOfType([PT.object, PT.array]),
  icon: PT.string,
};

Input.defaultProps = {
  style: {},
  icon: null,
};

export default Input;
