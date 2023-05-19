import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
// import { StyleSheet } from 'react-native';
import { theme } from '../../constants/myTheme';

import LoginScreen from './Login/LoginScreen';
import RegistrationScreen from './Registration/RegistrationScreen';
import BackButtonNavigationContainer from '../../components/Buttons/BackButtonNavigationContainer';

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
        }}
      >
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="RegistrationOne"
          component={RegistrationScreen}
          options={{ title: '' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
