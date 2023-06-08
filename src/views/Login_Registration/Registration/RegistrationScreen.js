import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import firebase from '../../../../config';
import { theme } from '../../../constants/myTheme';
import RegistrationPageOneView from './RegistrationPageOneView';
import RegistrationPageTwoView from './RegistrationPageTwoView';
import RegistrationPageThreeView from './RegistrationPageThreeView';
import VerifyEmailScreen from '../VerifyEmailScreen';
import BackButtonNavigationContainer from '../../../components/Buttons/BackButtonNavigationContainer';
import {
  setPreventBack,
  IpAddress,
  selectedNewJoinedGroups,
  setNewJoinedGroup,
} from '../../../redux/features/mainSlice/mainSlice';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundSand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 42,
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colors.primary,
  },
});

/**
 * This is the main representation of the Registration Screen for User to create an account.
 * For Demo purposes use "emailRegex".
 * For actual App: use the "emailRegexFH" Value
 */
export default function RegistrationScreen() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setPasswordConfirmation] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [imageUpload, setImage] = useState(null);
  const [selectedNames, setSelectedNames] = useState([]);
  const NewJoinedGroups = useSelector(selectedNewJoinedGroups);

  const clientIpAddress = useSelector(IpAddress);

  // Handle Navigation
  const RegistrationStack = createStackNavigator();
  const navigation = useNavigation();
  const handleTextLoginClick = () => {
    navigation.navigate('RegistrationOne');
  };
  const dispatch = useDispatch();

  const validateEmail = () => {
    // Users can only use two small letters, 6 numbers and the fh-email ending --> student emails.
    // Only for FH Students
    // const emailRegexFH = /[a-z]{2}\d{6}@fhstp\.ac\.at/;
    const emailRegexDEMO = /^.+@(gmail|hotmail|gmx|fhstp\.ac\.at)$/i; // FOR DEMO

    if (!emailRegexDEMO.test(email)) {
      setEmailError('Please enter a valid student FH email address.');
      return false;
    }
    setEmailError('');
    return true;
  };
  const validateUsername = () => {
    // Users can only use letters and numbers.
    const usernameRegex = /^[a-zA-Z0-9]+$/;

    if (!usernameRegex.test(username)) {
      setUsernameError(
        'Please enter a username that contains only letters or / and numbers. Please avoid spaces.'
      );
      return false;
    }
    setUsernameError('');
    return true;
  };
  const validateName = () => {
    // Users can user only letters, space and hyphen (-).
    const nameRegex = /^[A-Za-z -]+$/;

    if (!nameRegex.test(name)) {
      setNameError(
        'Please enter a name that contains only letters. Spaces and hyphens are also allowed.'
      );
      return false;
    }
    setNameError('');
    return true;
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError(
        'Please enter a password that is at least 8 characters long and contains at least one uppercase letter, one lowercase letter, and one number.'
      );
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handlePasswordConfirmationChange = () => {
    if (confirmPassword !== password) {
      setConfirmError('Passwords do not match');
      return false;
    }
    setConfirmError('');
    return true;
  };

  const handlePage2Click = async (event) => {
    event.preventDefault();
    const isEmailValid = validateEmail();
    const isUsernameValid = validateUsername();
    const isNameValid = validateName();
    const isPasswordValid = validatePassword();
    const isPasswordConfirm = handlePasswordConfirmationChange();

    // Check if email already exists
    if (isEmailValid) {
      try {
        const response = await axios.post(
          `http://${clientIpAddress}:3001/auth/checkEmailExists`,
          { email }
        );

        if (response.data.exists) {
          setEmailError('Email already exists.');
          return;
        }
        setEmailError('');
      } catch (error) {
        console.error('Error checking email:', error);
      }
    }

    // Submit registration form if there are no errors
    if (
      isEmailValid &&
      isUsernameValid &&
      isNameValid &&
      isPasswordValid &&
      isPasswordConfirm
    ) {
      navigation.navigate('RegistrationTwo');
    } else {
      console.log('Cannot proceed');
    }
  };

  const handlePage3Click = () => {
    navigation.navigate('RegistrationThree');
  };

  // Choose Profile Picture
  const pickProfilePicture = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      includeBase64: true,
      base64: true, // Set this option to include base64-encoded data URL
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleGroupSelection = (groupName) => {
    if (selectedNames.includes(groupName)) {
      setSelectedNames(selectedNames.filter((n) => n !== groupName));
    } else {
      setSelectedNames([...selectedNames, groupName]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      await firebase.auth().currentUser.sendEmailVerification();

      // Wait until the user verifies --> then add data to Database
      const unsubscribe = firebase.auth().onIdTokenChanged(async (user) => {
        if (user) {
          if (user.emailVerified) {
            // Email verification completed, add user data to the database
            const formData = new FormData();

            formData.append('email', email);
            formData.append('username', username);
            formData.append('name', name);
            formData.append('password', password);

            if (imageUpload) {
              formData.append('profile_image', {
                uri: imageUpload,
                type: 'image/jpeg',
                name: 'user_image.jpg',
              });
            }
            try {
              const response = await axios.post(
                `http://${clientIpAddress}:3001/auth/signup`,
                formData,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                }
              );

              console.log(response.data);

              const { userId } = response.data;
              const mainGroupIds = [...NewJoinedGroups];

              if (userId) {
                try {
                  const joinGroupResponse = await axios.post(
                    `http://${clientIpAddress}:3001/user/subscribe/maingroup`,
                    {
                      userId,
                      mainGroupIds,
                    }
                  );

                  console.log(joinGroupResponse.data);
                  dispatch(setNewJoinedGroup([]));
                } catch (error) {
                  console.error('Error joining recommended groups:', error);
                }
              }
              dispatch(setPreventBack(true));
            } catch (error) {
              console.error('Error sending form data:', error);
            } finally {
              unsubscribe();
            }
          } else {
            navigation.navigate('VerifyEmailScreen');
          }
        }
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <RegistrationStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerBackImage: () => <BackButtonNavigationContainer text="back" />,
        headerStyle: {
          backgroundColor: theme.colors.backgroundSand,
          borderBottomWidth: 0,
          borderBottomColor: theme.colors.backgroundSand,
        },
      }}
    >
      <RegistrationStack.Screen
        name="RegistrationPageOneView"
        options={{
          title: 'Step 1 of 3',
        }}
        style={style.container}
      >
        {(props) => (
          <RegistrationPageOneView
            {...props}
            // Email
            onChangeTextEmail={(value) => setEmail(value)}
            emailValue={email}
            emailError={emailError}
            // Username
            onChangeTextUsername={(value) => setUsername(value)}
            username={username}
            usernameError={usernameError}
            // Name
            onChangeTextName={(value) => setName(value)}
            nameValue={name}
            nameError={nameError}
            // Password
            onChangeTextPassword={(value) => setPassword(value)}
            passwordValue={password}
            passwordError={passwordError}
            // Confirm Password
            onPasswordConfirmation={(value) => setPasswordConfirmation(value)}
            confirmError={confirmError}
            // Upload Picture
            onPressProfileImageUpload={pickProfilePicture}
            imageUpload={imageUpload}
            onPressDeletePicture={() => setImage(null)}
            // Navigation
            onNavigateText={handleTextLoginClick}
            onNavigatePage2={handlePage2Click}
            onNavigatePage3={handlePage3Click}
          />
        )}
      </RegistrationStack.Screen>

      <RegistrationStack.Screen
        name="RegistrationTwo"
        component={RegistrationPageTwoView}
        options={{ title: 'Step 2 of 3' }}
        initialParams={{
          imageUpload,
          handleImageUpload: pickProfilePicture,
          selectedNames,
          setSelectedNames,
          handlePage3Click,
        }}
      />

      <RegistrationStack.Screen
        name="RegistrationThree"
        style={style.container}
        options={{ title: 'Step 3 of 3' }}
      >
        {(props) => (
          <RegistrationPageThreeView
            {...props}
            onGroupsSelected={handleGroupSelection} // Selection of the Main Groups
            selectedGroups={selectedNames}
            handleSubmit={handleSubmit} // Submit form
          />
        )}
      </RegistrationStack.Screen>

      {/* This is used */}
      <RegistrationStack.Screen
        name="VerifyEmailScreen"
        component={VerifyEmailScreen}
        options={{ title: '', headerShown: false }}
      />
    </RegistrationStack.Navigator>
  );
}
