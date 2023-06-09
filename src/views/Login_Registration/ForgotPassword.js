import React, { useState /* useEffect, useRef  */ } from 'react';
import { View, ScrollView, Text } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import { theme, styles } from '../../constants/myTheme';
import InputField from '../../components/Items/InputField';
import GreyButton from '../../components/Buttons/GreyButton';
import OrangeButton from '../../components/Buttons/OrangeButton';
import firebase from '../../../config';

// TODO add backend

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    backgroundColor: theme.colors.backgroundSand,
  },

  inputStyle: {
    paddingBottom: 20,
  },
});

export default function VerifyEmailScreen() {
  const [email] = useState('');

  const forgotPassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert('Check you emails to reset your password.');
      })
      .catch((err) => {
        alert(err);
      });
  };
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
            Forgot Password
          </Text>
          <Text style={[styles.subtitle2, { paddingBottom: 200 }]}>
            Enter your email address to change your forgotten password.
          </Text>

          <View style={style.inputStyle}>
            <InputField labelText="Enter Email" value={email} marginLeft={0} />
          </View>
          <OrangeButton
            text="Send Email"
            onPress={() => forgotPassword()}
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
