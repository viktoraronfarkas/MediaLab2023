import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import OrangeButton from '../../components/Buttons/OrangeButton';
import { theme, styles } from '../../constants/myTheme';

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: theme.colors.backgroundSand,
  },

  title: {
    fontSize: 32,
    textAlign: 'center',
    alignSelf: 'center',
    maxWidth: 250,
    paddingBottom: 20,
  },

  header: {
    paddingVertical: 20,
  },
  body: {
    paddingBottom: 40,
  },
});
/**
 * This is the Need Help Page.
 * It contains information about general data security.
 * Gives User the opportunity to navigate to Login Page
 */
export default function NeedHelp() {
  const navigation = useNavigation();

  const onNavigateLogin = () => {
    navigation.navigate('LoginScreen');
  };
  return (
    <SafeAreaView style={[style.container]}>
      <ScrollView style={{ margin: 20 }} showsVerticalScrollIndicator={false}>
        <Text style={[styles.headline1, style.title]}>Need Help?</Text>

        <Text
          style={[
            styles.bodyDefault,
            { textAlign: 'center', paddingBottom: 60 },
          ]}
        >
          To register you need to use your FH credentials, meaning your e-mail
          and password. Later you can go to your profile and change your
          password under: {'\n'}Profile - personal data.
        </Text>
        <Text style={[styles.headline2, style.header]}>
          Already have an account?
        </Text>
        <Text style={[styles.bodyDefault, style.body]}>
          Just click down below and we will guide you to your Login:
        </Text>
        <OrangeButton
          text="Login"
          onPress={onNavigateLogin}
          styleButton={{ alignSelf: 'center', width: '100%' }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
