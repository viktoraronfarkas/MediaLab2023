import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import UserProfileView from './UserProfileView';

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
  const { userData, studyCourse, imageUpload } =
    useFetchUserData(currentUserId);
  const dispatch = useDispatch();

  const [imageUploaded, setImage] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const navigation = useNavigation();
  // const userId = useFetchUserData();

  // // Update imageUploaded when imageUpload changes
  useEffect(() => {
    setImage(imageUpload);
  }, [imageUpload]);

  useEffect(() => {
    dispatch(setCurrentUser(userData));
    dispatch(setCurrentUser(studyCourse));
  }, [dispatch, userData]);
  // const { updateUser } = useUpdateUserData();

  // Open Action Dialog to edit, delete profile image
  const handleDialogOpen = () => {
    setDialogVisible(true);
  };

  // Delete Profile Picture (will show default image)
  const handleDeletePicture = () => {
    // setImage(null);
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
      // setImage(result.assets[0].uri);
      setDialogVisible(false);
    }

    // const updatedData = {
    //   profileImage: imageUpload || currentUser.profileImage,
    // };

    // try {
    //   await updateUser(updatedData);
    //   dispatch(setCurrentUser(updatedData));
    // } catch (error) {
    //   // Handle error if necessary
    //   console.error('Error updating user data:', error);
    //   throw error;
    // }
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
      username={currentUser.username ?? 'no data'}
      name={currentUser.name ?? 'null'}
      biography={currentUser.biography ?? 'no data'}
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
