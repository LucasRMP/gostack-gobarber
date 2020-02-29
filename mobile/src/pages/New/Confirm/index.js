import React, { useMemo } from 'react';
import { Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import Background from '~/components/Background';

import { Container, Avatar, Name, Time, SubmitButton } from './styles';

function Confirm() {
  const Route = useRoute();
  const navigation = useNavigation();

  const { provider, time } = Route.params;

  const timeFormatted = useMemo(
    () => formatRelative(parseISO(time), new Date(), { locale: pt }),
    [time]
  );

  const handleCreateAppointment = async () => {
    try {
      await api.post('/appointments', {
        provider_id: provider.id,
        date: time,
      });
    } catch (err) {
      console.tron.log(err);
      Alert.alert('Erro ao criar o agendamento', 'Verifique sua conexão');
    }
    navigation.reset();
  };

  return (
    <Background>
      <Container>
        <Avatar
          source={{
            uri: provider.avatar
              ? provider.avatar.url.replace('localhost', '10.0.3.2')
              : `https://api.adorable.io/avatar/50/${provider.name}.png`,
          }}
        />
        <Name>{provider.name}</Name>
        <Time>{timeFormatted}</Time>

        <SubmitButton onPress={handleCreateAppointment}>
          Confirmar Agendamento
        </SubmitButton>
      </Container>
    </Background>
  );
}

export default Confirm;
