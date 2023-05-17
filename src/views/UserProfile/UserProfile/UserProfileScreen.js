import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ToastAndroid, Alert, Clipboard, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import UserProfileView from './UserProfileView';

/**
 * This is the main User Profile Screen
 *
 */
export default function UserProfileScreen() {
  const [imageUpload, setImage] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const navigation = useNavigation();

  // we need to have the user.email declared & defined here for the handleCopy function:
  const email = 'cc201028@fhstp.ac.at';

  const handleCopy = () => {
    Clipboard.setString(email);
    if (Platform.OS === 'android') {
      ToastAndroid.show('The email has been copied.', ToastAndroid.SHORT);
    } else if (Platform.OS === 'ios') {
      Alert.alert('The email has been copied.');
    }
  };

  // Open Action Dialog to edit, delete profile image
  const handleDialogOpen = () => {
    setDialogVisible(true);
  };

  // Delete Profile Picture (will show default image)
  const handleDeletePicture = () => {
    setImage(null);
    setDialogVisible(false);
  };
  // Cancel the Dialog Action
  const handleCancelDialog = () => {
    setDialogVisible(false);
  };

  // Edit and choose Profile Picture
  const pickProfilePicture = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      includeBase64: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setDialogVisible(false);
    }
  };
  return (
    <UserProfileView
      profileImage={imageUpload}
      onPressEditImage={pickProfilePicture}
      onPressDeleteImage={handleDeletePicture}
      onPressProfileImageEdit={handleDialogOpen}
      alertVisible={dialogVisible}
      onPressCancelDialog={handleCancelDialog}
      username="Username"
      biography="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
      email={email}
      handleCopy={() => handleCopy(email)}
      name="Jane Doe"
      studyProgramme="BCC"
      // Settings
      onPersonalData={() => navigation.navigate('PersonalData')}
      onJoinedGroups={() => navigation.navigate('JoinedGroups')}
      onJoinedEvents={() => navigation.navigate('JoinedEvents')}
      onInteractedPosts={() => navigation.navigate('InteractedPosts')}
      onYourPostsEvents={() => navigation.navigate('YourPostsEvents')}
      onHelp={() => navigation.navigate('help')}
      onAboutUs={() => navigation.navigate('aboutUs')}
    />
  );
}
