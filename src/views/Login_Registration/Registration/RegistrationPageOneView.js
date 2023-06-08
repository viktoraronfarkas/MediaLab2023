import React, { useRef } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  View,
  Platform,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
} from 'react-native';
import ClickableText from '../../../components/ClickableText';
import { theme, styles } from '../../../constants/myTheme';
import InputField from '../../../components/Items/InputField';
import OrangeButton from '../../../components/Buttons/OrangeButton';
import CaptionScribbleHeading from '../../../components/Texts/CaptionScribbleHeading';
import scribble from '../../../../assets/Images/star-glitter-image.png';
import uploadIcon from '../../../../assets/Icons/upload-icon.png';
import cancelIcon from '../../../../assets/Icons/cancel-icon.png';
import checkIcon from '../../../../assets/Icons/check-icon.png';

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    backgroundColor: theme.colors.backgroundSand,
  },

  error: {
    color: theme.colors.primary,
    width: '100%',
    marginTop: 30,
    marginBottom: 15,
  },

  imageUploadedContainer: {
    paddingVertical: 40,
    flexDirection: 'column',
  },
  infoImageContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: theme.colors.neutralsWhite,
    borderWidth: 4,
  },

  iconCancel: {
    width: 30,
    height: 30,
  },
  iconCheck: {
    width: 50,
    height: 50,
  },

  inputStyle: {
    paddingBottom: 20,
  },
});

export default function RegistrationPageOneView({
  emailError,
  emailValue,
  onChangeTextEmail,

  usernameError,
  usernameValue,
  onChangeTextUsername,

  nameError,
  nameValue,
  onChangeTextName,

  passwordError,
  passwordValue,
  onChangeTextPassword,

  confirmError,
  confirmPasswordValue,
  onPasswordConfirmation,

  onPressProfileImageUpload,
  imageUpload,
  onPressDeletePicture,
  // fileNameImage,

  onNavigateText,
  onNavigatePage2,
}) {
  const scrollViewRef = useRef(null);
  const emailInputRef = useRef(null);
  const usernameInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);

  const focusEmailInput = () => {
    emailInputRef.current?.focus();
  };

  const focusUsernameInput = () => {
    usernameInputRef.current?.focus();
  };

  const focusNameInput = () => {
    nameInputRef.current?.focus();
  };

  const focusPasswordInput = () => {
    passwordInputRef.current?.focus();
  };

  const focusConfirmPasswordInput = () => {
    confirmPasswordInputRef.current?.focus();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={style.container}>
        <ScrollView ref={scrollViewRef} contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ paddingHorizontal: 25 }}>
            <View style={{ paddingTop: 30 }}>
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
            </View>
            {emailError ? <Text style={style.error}>{emailError}</Text> : null}
            <View style={style.inputStyle}>
              <InputField
                labelText="Enter Email"
                value={emailValue}
                onChangeText={onChangeTextEmail}
                marginLeft={0}
                inputRef={emailInputRef}
                onFocus={focusEmailInput}
              />
            </View>
            {usernameError ? (
              <Text style={style.error}>{usernameError}</Text>
            ) : null}
            <View style={style.inputStyle}>
              <InputField
                labelText="Your Displayed Name"
                value={usernameValue}
                onChangeText={onChangeTextUsername}
                marginLeft={0}
                inputRef={usernameInputRef}
                onFocus={focusUsernameInput}
              />
            </View>

            {nameError ? (
              <Text style={style.error}>{usernameError}</Text>
            ) : null}
            <View style={style.inputStyle}>
              <InputField
                labelText="Your Full Name"
                value={nameValue}
                onChangeText={onChangeTextName}
                marginLeft={0}
                inputRef={nameInputRef}
                onFocus={focusNameInput}
              />
            </View>
            {passwordError ? (
              <Text style={style.error}>{passwordError}</Text>
            ) : null}
            <View style={style.inputStyle}>
              <InputField
                labelText="Enter Password"
                value={passwordValue}
                onChangeText={onChangeTextPassword}
                secureTextEntry
                marginLeft={0}
                inputRef={passwordInputRef}
                onFocus={focusPasswordInput}
              />
            </View>
            {confirmError ? (
              <Text style={style.error}>{confirmError}</Text>
            ) : null}
            <View style={style.inputStyle}>
              <InputField
                labelText="Confirm Password"
                value={confirmPasswordValue}
                onChangeText={onPasswordConfirmation}
                secureTextEntry
                marginLeft={0}
                inputRef={confirmPasswordInputRef}
                onFocus={focusConfirmPasswordInput}
              />
            </View>

            {/* UPLOAD PROFILE IMAGE */}
            <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
              <Text style={styles.subtitle1}>
                Upload your profile picture here (optional):
              </Text>

              <TouchableOpacity
                onPress={onPressProfileImageUpload}
                style={{ paddingTop: 20, paddingBottom: 40 }}
              >
                <Image
                  source={uploadIcon}
                  style={{ width: 50, height: 50 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              {imageUpload && (
                <View style={style.imageUploadedContainer}>
                  <View
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Image
                      source={{ uri: imageUpload }}
                      style={style.profileImage}
                    />
                  </View>

                  <View style={style.infoImageContainer}>
                    <Image source={checkIcon} style={style.iconCheck} />
                    {/* <Text>File: Name:{imageUpload.fileNameImage}</Text> */}

                    <TouchableOpacity onPress={onPressDeletePicture}>
                      <Image source={cancelIcon} style={style.iconCancel} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
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
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
