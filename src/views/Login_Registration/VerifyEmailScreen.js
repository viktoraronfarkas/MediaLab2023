import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme, styles } from '../../constants/myTheme';
import GreyButton from '../../components/Buttons/GreyButton';
import OrangeButton from '../../components/Buttons/OrangeButton';
import firebase from '../../../config';

export default function VerifyEmailScreen() {
  const navigation = useNavigation();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const timerRef = useRef(null);
  const maxTimeInSeconds = 60;

  async function sendVerificationEmail() {
    const user = firebase.auth().currentUser;
    await user.sendEmailVerification();
  }

  async function checkEmailVerified() {
    await firebase.auth().currentUser.reload();
    const isVerified = firebase.auth().currentUser.emailVerified;

    if (isVerified) {
      clearInterval(timerRef.current);
      setIsEmailVerified(true);
    }
  }

  useEffect(() => {
    async function handleEmailVerification() {
      const { currentUser } = firebase.auth();

      setIsEmailVerified(currentUser.emailVerified);

      if (!currentUser.emailVerified) {
        sendVerificationEmail();

        timerRef.current = setInterval(() => {
          checkEmailVerified();
        }, 5000);
      }
    }

    handleEmailVerification();

    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (isEmailVerified) {
      clearInterval(timerRef.current);
      navigation.navigate('LoginScreen');
    }
  }, [isEmailVerified, navigation]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    // Redirect to login screen if the maximum time limit is reached
    if (!isEmailVerified) {
      const timeoutRef = setTimeout(() => {
        navigation.navigate('LoginScreen');
      }, maxTimeInSeconds * 1000000);

      return () => {
        clearTimeout(timeoutRef);
      };
    }
  }, [isEmailVerified, navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.backgroundSand }}>
      <ScrollView>
        <View
          style={{
            paddingHorizontal: 30,
            paddingVertical: 70,
          }}
        >
          <Text style={[styles.headline1, { paddingBottom: 10 }]}>
            Verify Email
          </Text>
          <Text style={[styles.subtitle2, { paddingBottom: 200 }]}>
            A Verification-Email has been sent to you. This can take a few
            moments. {'\n'}Don´t forget to check your spam folder.
          </Text>
          <OrangeButton
            text="Resend Email"
            onPress={() => sendVerificationEmail()}
            styleButton={{ alignSelf: 'center', width: '100%' }}
          />
          <View style={{ paddingTop: 20 }}>
            <GreyButton
              text="Cancel"
              onPress={() => firebase.instance.signOut()}
              styleButton={{ alignSelf: 'center', width: '100%' }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
