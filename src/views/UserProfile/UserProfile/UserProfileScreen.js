import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import UserProfileView from './UserProfileView';

import useFetchUserData from '../../../routes/hooks/useFetchUserData';

// TODO Fetch profile image & edit profile image
/**
 * This is the main User Profile Screen.
 * General data like profile image, username, email, biography, name are fetched and handled here.
 * Also navigating to the other settings.
 */
export default function UserProfileScreen() {
  const { userData, imageUpload } = useFetchUserData();
  const [imageUploaded, setImage] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const navigation = useNavigation();
  // const userId = useFetchUserData();

  // Update imageUploaded when imageUpload changes
  useEffect(() => {
    setImage(imageUpload);
  }, [imageUpload]);

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
      onPressEditImage={pickProfilePicture}
      onPressDeleteImage={handleDeletePicture}
      onPressProfileImageEdit={handleDialogOpen}
      alertVisible={dialogVisible}
      onPressCancelDialog={handleCancelDialog}
      // User Data
      profileImage={imageUploaded}
      username={userData.username ?? 'no data'}
      biography={userData.biography ?? 'no data'}
      emailUser={userData.email}
      name={userData.name ?? 'null'}
      studyProgramme={userData.studyProgramme ?? 'no data'}
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
