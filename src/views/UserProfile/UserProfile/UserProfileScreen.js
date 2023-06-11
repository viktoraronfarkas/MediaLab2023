import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import UserProfileView from './UserProfileView';
import useUpdateUserData from '../../../routes/hooks/useUpdateUserData';

import {
  setCurrentUser,
  selectedUser,
  selectedUserId,
} from '../../../redux/features/mainSlice/mainSlice';
import useFetchUserData from '../../../routes/hooks/useFetchUserData';

// TODO edit profile image
/**
 * This is the main User Profile Screen.
 * General data like profile image, username, email, biography, name are fetched and handled here.
 * Also navigating to the other settings.
 */
export default function UserProfileScreen() {
  const currentUser = useSelector(selectedUser);
  const currentUserId = useSelector(selectedUserId);
  const { userData, imageUpload } = useFetchUserData(currentUserId);
  const dispatch = useDispatch();

  const [imageUploaded, setImage] = useState(imageUpload);
  const [dialogVisible, setDialogVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setImage(imageUpload);
    dispatch(setCurrentUser(userData));
    dispatch(setCurrentUser(imageUpload));
  }, [dispatch, userData, imageUpload]);
  const { updateUser } = useUpdateUserData();

  // Open Action Dialog to edit, delete profile image
  const handleDialogOpen = () => {
    setDialogVisible(true);
  };

  // Delete Profile Picture (will show default image)
  const handleDeletePicture = async (event) => {
    event.preventDefault();
    const updatedData = {
      profileImage: null,
      email: currentUser.email,
      username: currentUser.username,
      name: currentUser.name,
      biography: currentUser.biography,
    };

    try {
      await updateUser(updatedData);
      setImage(null);
      dispatch(setCurrentUser(updatedData));
      setDialogVisible(false);
    } catch (error) {
      // Handle error if necessary
      console.error('Error updating user data:', error);
      throw error;
    }
    console.log(updatedData);
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
      includeBase64: true,
      base64: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setDialogVisible(false);
    }

    const updatedData = {
      email: currentUser.email,
      username: currentUser.username,
      name: currentUser.name,
      biography: currentUser.biography,
      profileImage: result.assets[0].uri || imageUpload,
    };

    try {
      await updateUser(updatedData);
      setImage(result.assets[0].uri);
      dispatch(setCurrentUser(updatedData));
    } catch (error) {
      // Handle error if necessary
      console.error('Error updating user data:', error);
      throw error;
    }
    console.log(updatedData);
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
      emailUser={currentUser.email}
      username={currentUser.username ?? 'null'}
      name={currentUser.name ?? 'null'}
      biography={currentUser.biography ?? 'No biography yet...'}
      studyCourse={currentUser.studyCourse || 'no data'}
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
