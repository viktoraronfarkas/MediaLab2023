import React from 'react';
import { View, Text, SafeAreaView, Image } from 'react-native';
import { styles, theme } from '../constants/myTheme';
import OrangeButton from '../components/Buttons/OrangeButton';
import BackButton from '../components/Buttons/BackButton';
import InputField from '../components/Items/InputField';
import passwordIcon from '../../assets/Icons/password-icon.png';

function changePassword() {
  return (
    <SafeAreaView
      style={{ backgroundColor: theme.colors.backgroundSand, flex: 1 }}
    >
      <View style={{ margin: 20 }}>
        <View style={{ marginBottom: 10, marginTop: 20 }}>
          <BackButton text="back" />
        </View>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={[styles.appTitle]}>UASync</Text>
          <Text
            style={[
              styles.headline3,
              { marginTop: 50, marginBottom: 10, marginHorizontal: 10 },
            ]}
          >
            Forgot your Passwort?
          </Text>
          <Text
            style={[
              styles.bodyDefault,
              { marginBottom: 10, marginHorizontal: 10, textAlign: 'center' },
            ]}
          >
            Please enter your new (and improved) Password:
          </Text>
        </View>

        <InputField labelText="New Password" padding={2} marginLeft={0} />

        <View style={{ marginTop: 40 }}>
          <OrangeButton
            text="Change Password"
            styleButton={{ alignSelf: 'center', width: '100%' }}
          />
        </View>

        <View style={{ alignItems: 'center', marginTop: 50 }}>
          <Image source={passwordIcon} style={{ width: 300, height: 300 }} />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default changePassword;
