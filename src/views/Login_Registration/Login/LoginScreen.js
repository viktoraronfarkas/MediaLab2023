import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import LoginView from './LoginView';

// TODO Validation / Authentication for available User inside DB
/**
 * This is the main representation of the Login Screen for User to login in their account
 */
export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // navigate to REGISTRATION Screen
  const navigation = useNavigation();
  const handleTextClick = () => {
    navigation.navigate('RegistrationOne');
  };

  const validateEmail = () => {
    const emailRegex = /[a-z]{2}\d{6}@fhstp\.ac\.at/;

    if (!emailRegex.test(email)) {
      setEmailError('Please enter your FH email address.');
      return false;
    }
    setEmailError('');
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    // submit registration form if there are no errors
    if (isEmailValid && isPasswordValid) {
      // TODO Validate User in Database here
      // TODO If available: Navigate to HomeScreen
      console.log('FH Student is login');
    } else {
      // if the input is not valid show this
      console.log('email or password is incorrect');
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
      onNavigateText={handleTextClick}
      handleSubmit={handleSubmit}
      // onForgotPassword={handleForgotPassword}
    />
  );
}
