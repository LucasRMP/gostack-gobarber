import React, { useEffect, useState } from 'react';
import { Alert, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Appointment from '~/components/Appointment';
import Background from '~/components/Background';
import { Container, Title, List, Filters, FilterText } from './styles';

// TODO: Change the navigation methid
function Dashboard() {
  const [appoitments, setAppointments] = useState([]);
  const [showPast, setShowPast] = useState(false);

  useEffect(() => {
    const componentDidMount = async () => {
      try {
        const res = await api.get('/appointments');
        setAppointments(res.data.filter(ap => ap.past === showPast));
      } catch (err) {
        Alert.alert('Not able to get appointments', 'Check your connection');
      }
    };

    componentDidMount();
  }, [showPast]);

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
        <Filters>
          <FilterText>Anteriores</FilterText>
          <Switch value={showPast} onValueChange={setShowPast} />
        </Filters>
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
