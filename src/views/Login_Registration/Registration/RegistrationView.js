import React from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';

import ClickableText from '../../../components/ClickableText';
import { theme, styles } from '../../../constants/myTheme';
import InputField from '../../../components/Items/InputField';
import OrangeButton from '../../../components/Buttons/OrangeButton';
import CaptionScribbleHeading from '../../../components/Texts/CaptionScribbleHeading';
import scribble from '../../../../assets/Images/star-glitter-image.png';
import image from '../../../../assets/Icons/upload-icon.png';

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
    width: '50%',
    marginTop: 30,
    marginBottom: 15,
  },
});

export default function RegistrationView({

  emailError,
  emailValue,
  onChangeTextEmail,
  usernameError,
  usernameValue,
  nameError,
  nameValue,
  onChangeTextName,
  onChangeTextUsername,
  passwordError,
  passwordValue,
  onChangeTextPassword,
  confirmError,
  confirmPasswordValue,
  onPasswordConfirmation,
  onPressProfileImageUpload,
  
  onNavigateText,
  onNavigatePage2,
}) {

  return (
    <SafeAreaView style={style.container}>
      <ScrollView>
        <CaptionScribbleHeading
          subHeading="Sign up"
          title="Please register below"
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

        {usernameError ? (
          <Text style={style.error}>{usernameError}</Text>
        ) : null}
        <InputField
          labelText="Your Username"
          value={usernameValue}
          onChangeText={onChangeTextUsername}
        />
        {nameError ? <Text style={style.error}>{usernameError}</Text> : null}
        <InputField
          labelText="Your Name"
          value={nameValue}
          onChangeText={onChangeTextName}
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

        {confirmError ? <Text style={style.error}>{confirmError}</Text> : null}
        <InputField
          labelText="Confirm Password"
          value={confirmPasswordValue}
          onChangeText={onPasswordConfirmation}
          secureTextEntry
        />

        <View style={{ paddingVertical: 30, paddingHorizontal: 20 }}>
          <Text style={styles.subtitle1}>
            Upload your profile here (optional):
          </Text>

          <TouchableOpacity onPress={onPressProfileImageUpload}>
            <Image
              source={image}
              style={{ width: 50, height: 50, paddingTop: 20 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <OrangeButton
          text="Next"
          onPress={onNavigatePage2}
          styleButton={{ alignSelf: 'center', width: '100%' }}
        />

        <ClickableText
          onPress={onNavigateText}
          text="Already have an account? Sign in here!"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
