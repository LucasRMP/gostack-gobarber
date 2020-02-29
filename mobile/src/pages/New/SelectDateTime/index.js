import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import api from '~/services/api';

import Background from '~/components/Background';
import DateInput from '~/components/DateInput';

import { Container, HourList, Hour, Title } from './styles';

function SelectDateTime() {
  const route = useRoute();
  const navigation = useNavigation();

  const { provider } = route.params;

  const [date, setDate] = useState(new Date());
  const [availables, setAvailables] = useState([]);

  useEffect(() => {
    const componentDidMount = async () => {
      try {
        const { data } = await api.get(`/providers/${provider.id}/available`, {
          params: {
            date: date.getTime(),
          },
        });
        setAvailables(data);
      } catch (err) {
        Alert.alert('Erro ao carregar a página', 'Cheque sua conexão');
      }
    };

    componentDidMount();
  }, [date, provider.id]);

  return (
    <Background>
      <Container>
        <DateInput value={date} onChange={setDate} />

        <HourList
          data={availables}
          keyExtractor={a => a.time}
          numColumns={2}
          renderItem={({ item: hour }) => (
            <Hour
              onPress={() =>
                navigation.navigate('Confirm', { provider, time: hour.value })
              }
              enabled={hour.available}
            >
              <Title>{hour.time}</Title>
            </Hour>
          )}
        />
      </Container>
    </Background>
  );
}

export default SelectDateTime;
