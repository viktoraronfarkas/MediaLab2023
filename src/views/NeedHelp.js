import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { styles, theme } from '../constants/myTheme';
import OrangeButton from '../components/Buttons/OrangeButton';
import BackButton from '../components/Buttons/BackButton';

function NeedHelp() {
  const DontWantRegisterHeadline = "Don't want to register?"; // For ESLint Error
  return (
    <SafeAreaView
      style={{ backgroundColor: theme.colors.backgroundSand, flex: 1 }}
    >
      <View style={{ margin: 20 }}>
        <View style={{ marginBottom: 10, marginTop: 20 }}>
          <BackButton text="back" />
        </View>
        <View style={{ alignItems: 'center', marginTop: 50 }}>
          <Text style={[styles.headline1, { marginBottom: 15 }]}>
            Need Help?
          </Text>
          <Text style={[styles.bodyDefault, { textAlign: 'center' }]}>
            To register you need to use your FH credentials, meaning your e-mail
            and password. Later you can go to your profile and change your
            password under: Profile - personal data.
          </Text>
        </View>

        <View style={{ alignItems: 'center', marginTop: 50 }}>
          <Text style={[styles.headline1, { marginBottom: 15 }]}>
            {DontWantRegisterHeadline}
          </Text>
          <Text
            style={[
              styles.bodyDefault,
              { textAlign: 'center', marginBottom: 20 },
            ]}
          >
            Just click down below and we will guide you to your Log in:
          </Text>
        </View>

        <View style={{ marginTop: 40 }}>
          <OrangeButton
            text="Log In!"
            styleButton={{ alignSelf: 'center', width: '100%' }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default NeedHelp;
