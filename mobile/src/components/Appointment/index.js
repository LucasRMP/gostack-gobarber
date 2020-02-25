import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PT from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Left, Avatar, Info, Name, Time } from './styles';

function Appointment({ data, onCancel }) {
  const dateParsed = useMemo(
    () =>
      formatRelative(parseISO(data.date), new Date(), {
        locale: pt,
        addSuffix: true,
      }),
    [data.date]
  );

  return (
    <Container past={data.past}>
      <Left>
        <Avatar
          source={{
            uri: data.provider.avatar
              ? data.provider.avatar.url.replace('localhost', '10.0.3.2')
              : `https://api.adorable.io/avatar/50/${data.provider.name}.png`,
          }}
        />
        <Info>
          <Name>{data.provider.name}</Name>
          <Time>{dateParsed}</Time>
        </Info>
      </Left>

      {data.cancelable && !data.canceled_at && (
        <TouchableOpacity onPress={() => onCancel(data.id)}>
          <Icon name="event-busy" size={20} color="#f64c75" />
        </TouchableOpacity>
      )}
    </Container>
  );
}

Appointment.propTypes = {
  data: PT.shape({
    past: PT.bool,
    cancelable: PT.bool,
    provider: PT.shape({
      name: PT.string,
      avatar: PT.any,
    }),
    date: PT.string,
    canceled_at: PT.string,
  }).isRequired,
  onCancel: PT.func.isRequired,
};

export default Appointment;
