import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Text, Button } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from '../../../config';
import Home from '../Home_Test';

export default function VerifyEmailScreen() {
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const HomeStack = createStackNavigator();
  const timerRef = useRef(null);

  async function sendVerificationEmail() {
    const user = firebase.auth().currentUser;
    await user.sendEmailVerification({
      // handleCodeInApp: true,
      // url: 'https://uasync-8e7a4.firebaseapp.com',
    });
  }

  async function checkEmailVerified() {
    await firebase.auth().currentUser.reload();

    const isVerified = firebase.auth().currentUser;

    // When it's turned to true, cancel the timer
    if (isVerified) {
      clearInterval(timerRef);
      setIsEmailVerified(true);
    }
  }

  useEffect(() => {
    // account needs to be created before
    setIsEmailVerified(firebase.auth().currentUser.emailVerified);

    if (!isEmailVerified) {
      sendVerificationEmail();

      // executes every 3 sec and checks if email is verified
      timerRef.current = setInterval(() => {
        // update the ref with the new value
        checkEmailVerified();
      }, 10000);

      // When it's turned to true, cancel the timer
      if (isEmailVerified) clearInterval(timerRef.current);
    }

    return () => {
      clearInterval(timerRef.current);
    };
  }, [isEmailVerified]);

  return isEmailVerified ? (
    // <NavigationContainer>
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  ) : (
    // {/* </NavigationContainer> */}
    <View>
      <ScrollView>
        <View style={{ padding: 70 }}>
          <Text>Verify Email</Text>
          <Text>Email has been sent to you</Text>
          <Button
            onPress={() => sendVerificationEmail()}
            title="Resend Email"
          />
          <Button onPress={() => firebase.instance.signOut()} title="Cancel" />
        </View>
      </ScrollView>
    </View>
  );
}
