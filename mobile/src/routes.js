import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';

import SelectProvider from '~/pages/New/SelectProvider';
import SelectDateTime from '~/pages/New/SelectDateTime';
import Confirm from '~/pages/New/Confirm';

const Stack = createStackNavigator();

const New = ({ navigation }) => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTitleStyle: { fontWeight: 'bold', color: '#fff' },
        headerLeftContainerStyle: { marginLeft: 20 },
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="Provider"
        component={SelectProvider}
        options={{
          title: 'Selecione um prestador',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
              <Icon name="chevron-left" size={25} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="Date" component={SelectDateTime} />
      <Stack.Screen name="Confirm" component={Confirm} />
    </Stack.Navigator>
  </NavigationContainer>
);

const createRouter = (signed = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createBottomTabNavigator(
          {
            Dashboard,
            New: {
              screen: New,
              navigationOptions: {
                tabBarLabel: 'Agendar',
                tabBarIcon: (
                  <Icon
                    name="add-circle-outline"
                    size={20}
                    color="rgba(255,255,255,.5)"
                  />
                ),
                tabBarVisible: false,
              },
            },
            Profile,
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#fff',
              inactiveTintColor: 'rgba(255,255,255,.5)',
              style: {
                backgroundColor: '#8d41a8',
                borderTopWidth: 0,
              },
            },
          }
        ),
      },
      {
        initialRouteName: signed ? 'App' : 'Sign',
      }
    )
  );

export default createRouter;
