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
import cancelIcon from '../../../../assets/Icons/cancel-icon.png';
import checkIcon from '../../../../assets/Icons/check-icon.png';

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

  imageUploadedContainer: {
    paddingVertical: 40,
    flexDirection: 'column',
  },
  infoImageContainer: {
    paddingVertical: 40,
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
            Upload your profile picture here (optional):
          </Text>

          <TouchableOpacity
            onPress={onPressProfileImageUpload}
            style={{ paddingTop: 20 }}
          >
            <Image
              source={image}
              style={{ width: 50, height: 50, padding: 30 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          {imageUpload && (
            <View style={style.imageUploadedContainer}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
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
      </ScrollView>
    </SafeAreaView>
  );
}