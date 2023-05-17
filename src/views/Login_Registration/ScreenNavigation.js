import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { theme } from '../../constants/myTheme';

import LoginScreen from './Login/LoginScreen';
import RegistrationScreen from './Registration/RegistrationScreen';
import Main from '../Main';
import JoinGroup from '../JoinGroupScreen';

export default function ScreenNavigation() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: theme.colors.onInfo,
          headerStyle: {
            borderBottomWidth: 0,
            borderColor: theme.colors.backgroundWhite,
            backgroundColor: theme.colors.backgroundSand,
          },
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ title: 'Login to UASync' }}
        />
        <Stack.Screen
          name="RegistrationOne"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="MainScreen" component={Main} />
        <Stack.Screen name="JoinGroupScreen" component={JoinGroup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
