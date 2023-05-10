import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { theme } from '../../constants/myTheme';
import LoginScreen from './Login/LoginScreen';
import Main from '../Main';
import RegistrationScreen from './Registration/Registration';
import RegistrationPageTwoView from './Registration/RegistrationPageTwoView';
import RegistrationPageThreeView from './Registration/RegistrationPageThreeView';

export default function LoginNavigation() {
  const Stack = createStackNavigator();
  const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.backgroundSand,
      alignItems: 'center',
      justifyContent: 'center',

    },
    text: {
      fontSize: 42,
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.colors.primary
    },
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{title: 'Login to UASync'}}
          style={style.container}
        />
        <Stack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
          options={{title: 'Step 1 of 3'}}
          style={style.container}
        />
        <Stack.Screen name="RegistrationTwo" component={RegistrationPageTwoView} style={style.container}  options={{title: 'Step 2 of 3'}}/>
        <Stack.Screen name="RegistrationThree" component={RegistrationPageThreeView} style={style.container} options={{title: 'Step 3 of 3'}}/>
        <Stack.Screen name="MainScreen" component={Main}  options={{title: 'Home'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
