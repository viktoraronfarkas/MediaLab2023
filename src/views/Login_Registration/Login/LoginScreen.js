import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginView from './LoginView';
import {
  setCurrentUser,
  IpAddress,
  setLoggedIn,
} from '../../../redux/features/mainSlice/mainSlice';

// TODO Validation / Authentication for available User inside DB
/**
 * This is the main representation of the Login Screen for User to login in their account
 */
export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();
  const clientIpAddress = useSelector(IpAddress);

  // navigate to REGISTRATION Screen
  const navigation = useNavigation();
  const handleTextClick = () => {
    navigation.navigate('RegistrationOne');
  };

  // saving user_id in local storage
  const storeUserId = async (value) => {
    try {
      await AsyncStorage.setItem('userID', String(value));
    } catch (e) {
      // saving error
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `http://${clientIpAddress}:3001/auth/login`,
        {
          email,
          password,
        }
      );

      const { message, user } = response.data;

      // Optional: Display success message
      console.log(message);

      // TODO: Store user data or token in the app state or local storage
      dispatch(setCurrentUser(user));
      console.log(user);

      // Set the isUserLoggedIn state to true
      dispatch(setLoggedIn(true));

      // Store user_id in local storage
      storeUserId(user.user_id);
    } catch (error) {
      console.error(
        'Login error:',
        error.response?.data?.error || error.message
      );
      const errorMessage = error.response?.data?.error;

      if (errorMessage === 'invalidEmail') {
        setEmailError('Invalid email');
      } else if (errorMessage === 'invalidPassword') {
        setPasswordError('Invalid password');
      } else {
        // Handle other login errors here
      }
    }
  };

  return (
    <LoginView
      emailError={emailError}
      emailValue={email}
      onChangeTextEmail={(value) => setEmail(value)}
      passwordError={passwordError}
      passwordValue={password}
      onChangeTextPassword={(value) => setPassword(value)}
      handleSubmit={handleSubmit}
      onNavigateText={handleTextClick}

      // onForgotPassword={handleForgotPassword}
    />
  );
}
