import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Appointment from '~/components/Appointment';
import Background from '~/components/Background';
import { Container, Title, List } from './styles';

function Dashboard() {
  const [appoitments, setAppointments] = useState([]);

  useEffect(() => {
    const componentDidMount = async () => {
      try {
        const res = await api.get('/appointments');
        setAppointments(res.data);
      } catch (err) {
        Alert.alert('Not able to get appointments', 'Check your connection');
      }
    };

    componentDidMount();
  }, []);

  const handleCancel = async id => {
    try {
      const res = await api.delete(`/appointments/${id}`);
      setAppointments(
        appoitments.map(ap =>
          ap.id === id ? { ...ap, canceled_at: res.data.canceled_at } : ap
        )
      );
    } catch (err) {
      Alert.alert('Erro ao cancelar o agendamento', 'Verifique a conexão');
    }
  };

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>
        <List
          data={appoitments}
          keyExtractor={element => String(element.id)}
          renderItem={({ item }) => (
            <Appointment data={item} onCancel={handleCancel} />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};

export default Dashboard;
