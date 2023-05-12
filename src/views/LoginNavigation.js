import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import LoginScreen from './Login';
import Main from './Main';
import RegistrationScreen from './Registration';
import JoinGroup from './JoinGroupScreen';

export default function LoginNavigation() {
  const Stack = createStackNavigator();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 42,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          style={styles.container}
        />
        <Stack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
          style={styles.container}
        />
        <Stack.Screen name="MainScreen" component={Main} />
        <Stack.Screen name="JoinGroupScreen" component={JoinGroup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
