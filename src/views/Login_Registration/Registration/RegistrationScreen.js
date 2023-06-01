import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { /* useDispatch, */ useSelector } from 'react-redux';
import firebase from '../../../../config';
import { theme } from '../../../constants/myTheme';
import RegistrationPageOneView from './RegistrationPageOneView';
import RegistrationPageTwoView from './RegistrationPageTwoView';
import RegistrationPageThreeView from './RegistrationPageThreeView';
import VerifyEmailScreen from '../VerifyEmailScreen';
// import Home from '../../Home_Test';
import BackButtonNavigationContainer from '../../../components/Buttons/BackButtonNavigationContainer';
import {
  IpAddress,
  // selectedNewJoinedGroups,
  // setNewJoinedGroup,
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

// TODO Check if username already exists in the DB
// TODO onSubmit it should direct to authentication Screen and User should receive an Email to authenticate
// TODO DELETE Console logs
// TODO After Authentication create new User to DB
// TODO delete console log after backend implementation

/**
 * This is the main representation of the Registration Screen for User to create an account
 * */
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
  // const [loading, setLoading] = useState(false);
  // const NewJoinedGroups = useSelector(selectedNewJoinedGroups);

  const clientIpAddress = useSelector(IpAddress);

  // Handle Navigation
  const RegistrationStack = createStackNavigator();
  const navigation = useNavigation();
  const handleTextLoginClick = () => {
    navigation.navigate('LoginScreen');
  };
  // const dispatch = useDispatch();

  const validateEmail = () => {
    // const emailRegex = /[a-z]{2}\d{6}@fhstp\.ac\.at/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid FH email address.');
      return false;
    }
    setEmailError('');
    return true;
  };
  const validateUsername = () => {
    const usernameRegex = /^[a-zA-Z0-9]+$/;

    if (!usernameRegex.test(username)) {
      setUsernameError(
        'Please enter a username that contains only letters or / and numbers.'
      );
      return false;
    }
    setUsernameError('');
    return true;
  };
  const validateName = () => {
    const nameRegex = /^[a-zA-Z]+$/;

    if (!nameRegex.test(name)) {
      setNameError('Please enter a name that contains only letters.');
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
      includeBase64: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
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

    // submit registration form if there are no errors
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      // Send the verification email
      await firebase.auth().currentUser.sendEmailVerification({
        handleCodeInApp: true,
        url: 'https://uasync-8e7a4.firebaseapp.com',
      });
      // Prompt the user to verify their email address
      alert(
        'A verification email has been sent to your email address. Please verify your email address to complete the registration process.'
      );
      navigation
        .navigate('VerifyEmailScreen')

        // Update the user's password once they have verified their email address

        .then(() => {
          // Update the user's information in the database
          firebase
            .firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .set({
              email,
              username,
              name,
              imageUpload,
              selectedNames,
            });
        })

        .catch((error) => {
          alert(error.message);
        });
    } catch (error) {
      alert(error.message);
    }

    console.log(selectedNames);
    // // Create FormData object
    // const formData = new FormData();

    // // Append form fields to FormData object
    // formData.append('email', email);
    // formData.append('username', username);
    // formData.append('name', name);
    // formData.append('password', password);

    // Check if an image is uploaded
    // if (imageUpload) {
    //   try {
    //     setLoading(true);
    //     const response = await fetch(imageUpload);
    //     const blob = await response.blob();

    //     // Append the image blob to FormData object
    //     formData.append('profile_image', blob, 'profile_image.png');
    //   } catch (error) {
    //     console.error('Error reading image file:', error);
    //   }
    // }

    // Make the API request using Axios or any other HTTP client library
    // try {
    //   const response = await axios.post(
    //     `http://${clientIpAddress}:3001/auth/signup`,
    //     formData,
    //     {
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //       },
    //     }
    //   );

    //   // Handle response
    //   console.log(response.data);

    // Retrieve the user ID from the response
    //   const { userId } = response.data;
    //   const mainGroupIds = [...NewJoinedGroups];

    //   // Join the recommended groups with the user ID
    //   if (userId) {
    //     try {
    //       const joinGroupResponse = await axios.post(
    //         `http://${clientIpAddress}:3001/user/subscribe/maingroup`,
    //         {
    //           userId,
    //           mainGroupIds,
    //         }
    //       );

    //       // Handle join group response
    //       console.log(joinGroupResponse.data);
    //       dispatch(setNewJoinedGroup([]));
    //     } catch (error) {
    //       // Handle error
    //       console.error('Error joining recommended groups:', error);
    //     }
    //   }

    //   // navigation.navigate('LoginScreen');
    // } catch (error) {
    //   // Handle error
    //   console.error('Error sending form data:', error);
    // } finally {
    //   setLoading(false);
    // }
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
            // Selection of the Main Groups
            onGroupsSelected={handleGroupSelection}
            selectedGroups={selectedNames}
            // Submit form
            handleSubmit={handleSubmit}
            // loading={loading}
          />
        )}
      </RegistrationStack.Screen>

      <RegistrationStack.Screen
        name="VerifyEmailScreen"
        component={VerifyEmailScreen}
      />
    </RegistrationStack.Navigator>
  );
}
