import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme, styles } from '../../constants/myTheme';
import GreyButton from '../../components/Buttons/GreyButton';
import OrangeButton from '../../components/Buttons/OrangeButton';
import firebase from '../../../config';

/**
 * This Screen represents the Verification Screen.
 * It is displayed as long the user either verifies or cancels the process.
 */
export default function VerifyEmailScreen() {
  const navigation = useNavigation();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const timerRef = useRef(null);
  const maxTimeInSeconds = 60;

  // If the User hits "Cancel" the auth process will be stopped and the user deleted.
  // TODO Cache must be deleted to prevent sending double data in the following registration round.
  const deleteIncompleteUserAccount = () => {
    const user = firebase.auth().currentUser;

    if (user) {
      user
        .delete()
        .then(() => {
          navigation.navigate('LandingScreen');
          console.log('Incomplete user account deleted successfully.');
        })
        .catch((error) => {
          console.error('Error deleting incomplete user account:', error);
        });
    }
  };

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
    }
    return () => {
      navigation.navigate('LoginScreen');
    };
  }, [isEmailVerified, navigation]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    // Redirect to login screen if the maximum time limit is reached
    if (!isEmailVerified) {
      const timeoutRef = setTimeout(() => {
        navigation.navigate('LandingScreen');
        deleteIncompleteUserAccount();
      }, maxTimeInSeconds * 10000);

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
            A verification email has been sent to your email address. {'\n'}It
            may take a few moments for the email to arrive. {'\n'}Please
            remember to check your spam folder as well.
          </Text>
          <OrangeButton
            text="Resend Email"
            onPress={() => sendVerificationEmail()}
            styleButton={{ alignSelf: 'center', width: '100%' }}
          />
          <View style={{ paddingTop: 20 }}>
            <GreyButton
              text="Cancel"
              onPress={() => {
                deleteIncompleteUserAccount();
                navigation.navigate('LandingScreen');
              }}
              styleButton={{ alignSelf: 'center', width: '100%' }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
