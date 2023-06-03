import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from '../../../config';
import ScreenNavigation from './ScreenNavigation';
import Home from '../Home_Test';

export default function UserAuthentication() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const AuthStack = createStackNavigator();

  useEffect(() => {
    // Handle user state changes
    function onAuthStateChanged() {
      if (user && user.emailVerified) {
        setUser(user);
      } else {
        setUser(null);
      }
      if (initializing) setInitializing(false);
    }
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [initializing, user]);

  if (initializing) return null;

  if (!user) {
    return <ScreenNavigation />;
  }

  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen name="Home" component={Home} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
