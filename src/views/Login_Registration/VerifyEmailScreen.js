import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme, styles } from '../../constants/myTheme';
import firebase from '../../../config';

export default function VerifyEmailScreen() {
  const navigation = useNavigation();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const timerRef = useRef(null);

  async function sendVerificationEmail() {
    const user = firebase.auth().currentUser;
    await user.sendEmailVerification();
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
      timerRef.current = setInterval(async () => {
        // update the ref with the new value
        await checkEmailVerified();
      }, 5000);

      // When it's turned to true, cancel the timer
      if (isEmailVerified) clearInterval(timerRef.current);
    }

    return () => {
      clearInterval(timerRef.current);
    };
  }, [isEmailVerified]);

  useEffect(() => {
    if (isEmailVerified) {
      navigation.navigate('LoginScreen');
    }
  }, [isEmailVerified, navigation]);

  return (
    <View style={{ backgroundColor: theme.colors.backgroundSand }}>
      <ScrollView>
        <View style={{ padding: 70 }}>
          <Text style={styles.headline1}>Verify Email</Text>
          <Text style={styles.subtitle2}>Email has been sent to you</Text>
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
