import React from 'react';
import {
  Alert,
  Clipboard,
  // Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { IconButton } from 'react-native-paper';
import { styles, theme } from '../../../constants/myTheme';

import CaptionScribbleHeading from '../../../components/Texts/CaptionScribbleHeading';
import DialogAction from '../../../components/Dialogs/DialogAction';
import ListItemOnlyText from '../../../components/Items/ListItemOnlyText';
import ProfileImage from '../../../components/ProfileImageScribble';
import OrangeSubtitleBodyText from '../../../components/Texts/OrangeSubtitleBodyText';

import iconImage from '../../../../assets/Icons/arrow-right.png';
// import uploadIcon from '../../../../assets/Icons/upload-icon.png';
import arrow from '../../../../assets/Images/arrow-image.png';
import scribble from '../../../../assets/Images/heart-right-image.png';
import underline from '../../../../assets/Images/under-line-image.png';
import OrangeButton from '../../../components/Buttons/OrangeButton';
import {
  setLoggedIn,
  setSelectedMainGroup,
  setCurrentUserId,
} from '../../../redux/features/mainSlice/mainSlice';

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.colors.backgroundSand,
  },
});

/**
 * This is the main User Profile View / UI
 */
export default function UserProfileView({
  profileImage,
  // onPressProfileImageEdit,
  onPressEditImage,
  onPressDeleteImage,
  onPressCancelDialog,
  alertVisible,
  biography,
  emailUser,
  username,
  name,
  // studyProgramme,
  onPersonalData,
  onHelp,
  onAboutUs,
  // onJoinedGroups,
  // onJoinedEvents,
  // onInteractedPosts,
  // onYourPostsEvents,
}) {
  // copy email to the Clipboard
  const handleCopy = () => {
    Clipboard.setString(emailUser);
    if (Platform.OS === 'android') {
      ToastAndroid.show('The email has been copied.', ToastAndroid.SHORT);
    } else if (Platform.OS === 'ios') {
      Alert.alert('The email has been copied.');
    }
  };

  // navigate to REGISTRATION Screen
  const dispatch = useDispatch();

  const handleRemove = async () => {
    try {
      await AsyncStorage.removeItem('userID');
      // Set the isUserLoggedIn state to true
      dispatch(setLoggedIn(false));
      dispatch(setSelectedMainGroup(''));
      dispatch(setCurrentUserId(''));

      return true;
    } catch (exception) {
      return false;
    }
  };
  return (
    <SafeAreaView style={style.container}>
      <ScrollView
        style={{ paddingHorizontal: 30 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ paddingVertical: 10 }}>
          <CaptionScribbleHeading
            subHeading="Only you"
            title="Your Profile"
            scribbleSubHeadingImage={scribble}
            underlineImage={underline}
            arrowImage={arrow}
            underlineStyle={{ height: 120, width: 80, left: 50 }}
          />
        </View>

        {/* Profile Image */}
        <ProfileImage profileImage={profileImage} username={username} />

        {/* <TouchableOpacity onPress={onPressProfileImageEdit}>
          <Image
            source={uploadIcon}
            style={{
              width: 40,
              height: 40,
              alignSelf: 'flex-end',
              right: 70,
              top: 20,
            }}
            resizeMode="contain"
          />
        </TouchableOpacity> */}

        {/* When uploadIcon pressed: show this dialog  */}
        <View>
          <DialogAction
            containerStyle={{
              marginVertical: 200,
              marginHorizontal: 15,
              paddingRight: 20,
            }}
            visible={alertVisible}
            text="Upload or edit your Profile-Picture. You can also delete it or cancel this action"
            isDialog
            actions={[
              {
                id: 1,
                text: 'Delete Picture',
                onPress: onPressDeleteImage,
              },
              { id: 2, text: 'Upload Picture', onPress: onPressEditImage },
            ]}
            optionalButtonText="Cancel"
            onPressOptionalButton={onPressCancelDialog}
          />
        </View>

        {/* User Info */}
        <View style={{ paddingTop: 130 }}>
          <TouchableOpacity onPress={() => handleCopy(emailUser)}>
            <OrangeSubtitleBodyText title="Email" bodyText={emailUser} />
            <IconButton
              icon="content-copy"
              style={{
                position: 'absolute',
                alignSelf: 'flex-end',
                top: 10,
              }}
            />
          </TouchableOpacity>

          <OrangeSubtitleBodyText title="Full Name" bodyText={name} />

          <OrangeSubtitleBodyText title="Biography" bodyText={biography} />

          {/* <OrangeSubtitleBodyText
            title="Study Programme"
            bodyText={studyProgramme}
          /> */}

          {/* Settings */}
          <Text style={[styles.headline3, { paddingVertical: 20 }]}>
            Account Details
          </Text>

          <ListItemOnlyText
            title="Personal Data"
            iconImage={iconImage}
            onPress={onPersonalData}
            cardContainerStyle={{ marginVertical: 7, paddingVertical: 1 }}
          />

          {/* Add these when ready */}
          {/* <ListItemOnlyText
            title="Your Posts/Events"
            iconImage={iconImage}
            onPress={onYourPostsEvents}
            cardContainerStyle={{ marginVertical: 7, paddingVertical: 1 }}
          />
          <ListItemOnlyText
            title="Interacted Posts"
            iconImage={iconImage}
            onPress={onInteractedPosts}
            cardContainerStyle={{ marginVertical: 7, paddingVertical: 1 }}
          />
          <ListItemOnlyText
            title="Joined Groups"
            iconImage={iconImage}
            onPress={onJoinedGroups}
            cardContainerStyle={{ marginVertical: 7, paddingVertical: 1 }}
          />
          <ListItemOnlyText
            title="Joined Events"
            iconImage={iconImage}
            onPress={onJoinedEvents}
            cardContainerStyle={{ marginVertical: 7, paddingVertical: 1 }}
          /> */}

          <ListItemOnlyText
            title="Help"
            iconImage={iconImage}
            onPress={onHelp}
            cardContainerStyle={{ marginVertical: 7, paddingVertical: 1 }}
          />
          <ListItemOnlyText
            title="About Us"
            iconImage={iconImage}
            onPress={onAboutUs}
            cardContainerStyle={{ marginVertical: 7, paddingVertical: 1 }}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            top: 10,
            paddingBottom: 20,
          }}
        >
          <OrangeButton text="Log Out" onPress={handleRemove} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
