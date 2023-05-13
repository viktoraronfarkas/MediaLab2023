import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
// import { StyleSheet } from 'react-native';
import { theme } from '../../constants/myTheme';

import LoginScreen from './Login/LoginScreen';
import RegistrationScreen from './Registration/RegistrationScreen';

// const style = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: theme.colors.backgroundSand,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text: {
//     fontSize: 42,
//     alignItems: 'center',
//     justifyContent: 'center',
//     color: theme.colors.primary,
//   },
// });
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
