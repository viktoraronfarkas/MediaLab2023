import React from 'react';
import { SafeAreaView, Text, StyleSheet, ScrollView } from 'react-native';
import ClickableText from '../../../components/ClickableText';

import InputField from '../../../components/Items/InputField';
import OrangeButton from '../../../components/Buttons/OrangeButton';
import CaptionScribbleHeading from '../../../components/Texts/CaptionScribbleHeading';
import { theme } from '../../../constants/myTheme';
import scribble from '../../../../assets/Images/star-glitter-image.png';

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: theme.colors.backgroundSand,
  },
  error: {
    color: theme.colors.primary,
    width: '90%',
    marginTop: 40,
    marginHorizontal: 20,
  },
});

export default function LoginView({
  emailError,
  emailValue,
  onChangeTextEmail,
  passwordError,
  passwordValue,
  onChangeTextPassword,
  onForgotPassword,
  onNavigateText,
  handleSubmit,
}) {
  return (
    <SafeAreaView style={style.container}>
      <ScrollView>
        <CaptionScribbleHeading
          subHeading="Sign in"
          title="Please enter your email and password"
          headlineStyle={{ width: 300 }}
          scribbleSubHeadingImage={scribble}
          scribbleStyle={{
            width: 50,
            height: 50,
            right: 0,
            position: 'absolute',
            alignSelf: 'flex-end',
          }}
        />

        {emailError ? <Text style={style.error}>{emailError}</Text> : null}
        <InputField
          labelText="Enter Email"
          value={emailValue}
          onChangeText={onChangeTextEmail}
        />

        {passwordError ? (
          <Text style={style.error}>{passwordError}</Text>
        ) : null}
        <InputField
          labelText="Enter Password"
          value={passwordValue}
          onChangeText={onChangeTextPassword}
          secureTextEntry
        />
        <ClickableText
          onPress={onForgotPassword}
          text="Forgot Password?"
          clickableTextStyle={{ alignSelf: 'flex-end' }}
          textLinkStyle={{
            textDecorationLine: 'underlined',
          }}
        />

        <OrangeButton
          text="Login"
          onPress={handleSubmit}
          styleButton={{ alignSelf: 'center', width: '100%' }}
        />

        <ClickableText
          onPress={onNavigateText}
          text="No account yet? Sign up now!"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
