import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';
import ClickableText from '../../../components/ClickableText';
import InputField from '../../../components/Items/InputField';
import OrangeButton from '../../../components/Buttons/OrangeButton';
import CaptionScribbleHeading from '../../../components/Texts/CaptionScribbleHeading';
import { theme } from '../../../constants/myTheme';
import scribble from '../../../../assets/Images/star-glitter-image.png';

const style = StyleSheet.create({
  container: {
    flex: 1,

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
        <View style={{ paddingHorizontal: 30, paddingTop: 30 }}>
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
        </View>
        {emailError ? <Text style={style.error}>{emailError}</Text> : null}
        <View style={{ paddingHorizontal: 30, paddingTop: 30 }}>
          <InputField
            labelText="Enter Email"
            value={emailValue}
            onChangeText={onChangeTextEmail}
            marginLeft={0}
          />
        </View>
        {passwordError ? (
          <Text style={style.error}>{passwordError}</Text>
        ) : null}
        <View style={{ paddingHorizontal: 30, paddingVertical: 20 }}>
          <InputField
            labelText="Enter Password"
            value={passwordValue}
            onChangeText={onChangeTextPassword}
            secureTextEntry
            marginLeft={0}
          />
        </View>
        <ClickableText
          onPress={onForgotPassword}
          text="Forgot Password?"
          clickableTextStyle={{ alignSelf: 'flex-end' }}
          textLinkStyle={{
            textDecorationLine: 'underlined',
          }}
        />
        <View style={{ paddingHorizontal: 30 }}>
          <OrangeButton
            text="Login"
            onPress={handleSubmit}
            styleButton={{ alignSelf: 'center', width: '100%' }}
          />
        </View>
        <ClickableText
          onPress={onNavigateText}
          text="No account yet? Sign up now!"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
