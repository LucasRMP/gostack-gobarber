import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import api from '~/services/api';

import Background from '~/components/Background';

import { Container, ProvidersList, Provider, Avatar, Name } from './styles';

function SelectProvider() {
  const navigation = useNavigation();

  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const componentDidMount = async () => {
      try {
        const { data } = await api.get('/providers');
        setProviders(data);
      } catch (e) {
        Alert.alert('Erro ao carregar a página', 'Cheque sua conexão');
      }
    };

    componentDidMount();
  }, []);

  return (
    <Background>
      <Container>
        <ProvidersList
          data={providers}
          keyExtractor={p => String(p.id)}
          numColumns={2}
          renderItem={({ item: provider }) => (
            <Provider onPress={() => navigation.navigate('Date', { provider })}>
              <Avatar
                source={{
                  uri: provider.avatar
                    ? provider.avatar.url.replace('localhost', '10.0.3.2')
                    : `https://api.adorable.io/avatar/50/${provider.name}.png`,
                }}
              />
              <Name>{provider.name}</Name>
            </Provider>
          )}
        />
      </Container>
    </Background>
  );
}

SelectProvider.navigationOptions = {
  title: 'Selecione um prestador',
};

export default SelectProvider;
