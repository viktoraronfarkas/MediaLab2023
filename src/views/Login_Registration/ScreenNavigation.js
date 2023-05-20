import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { theme } from '../../constants/myTheme';

import LandingScreen from '../LandingScreen';
import LoginScreen from './Login/LoginScreen';
import RegistrationScreen from './Registration/RegistrationScreen';
import BackButtonNavigationContainer from '../../components/Buttons/BackButtonNavigationContainer';
import Main from '../Main';
import JoinGroup from '../JoinGroupScreen';
import JoinedSubgroup from '../JoinedSubgroup';
import AddSubgroup from '../AddSubgroup';

export default function ScreenNavigation() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
          headerBackImage: () => <BackButtonNavigationContainer text="back" />,
          headerStyle: {
            backgroundColor: theme.colors.backgroundSand,
            borderBottomWidth: 0,
            borderBottomColor: theme.colors.backgroundSand,
          },
          headerShown: false,
        }}
      >
        <Stack.Screen name="LandingScreen" component={LandingScreen} />

        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ title: '', headerShown: true }}
        />
        <Stack.Screen
          name="RegistrationOne"
          component={RegistrationScreen}
          options={{ title: '' }}
        />
        <Stack.Screen name="MainScreen" component={Main} />
        <Stack.Screen name="JoinGroupScreen" component={JoinGroup} />
        <Stack.Screen name="JoinedSubgroup" component={JoinedSubgroup} />
        <Stack.Screen name="AddSubgroup" component={AddSubgroup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
