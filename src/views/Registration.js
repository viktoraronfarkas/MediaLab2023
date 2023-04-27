import React, { useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import ClickableText from '../components/components';
import stylesLoginReg from './Form_style';

// TODO Check if username already exists in the DB
// TODO onSubmit it should direct to authentication Screen and User should receive an Email to authenticate
// TODO DELETE Console logs
// TODO After Authentication create new User to DB

/// This is the main representation of the Registration Screen for User to create an account
function RegistrationScreen() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setPasswordConfirmation] = useState('');
  const [confirmError, setConfirmError] = useState('');

  // Navigate to LOGIN SCREEN
  const navigation = useNavigation();
  const handleTextClick = () => {
    navigation.navigate('LoginScreen');
  };

  const validateEmail = () => {
    const emailRegex = /[a-z]{2}\d{6}@fhstp\.ac\.at/;

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const isEmailValid = validateEmail(email);
    const isUsernameValid = validateUsername(username);
    const isPasswordValid = validatePassword(password);
    const isPasswordConfirm = handlePasswordConfirmationChange(confirmPassword);

    // submit registration form if there are no errors
    // TODO delete console log after backend implementation
    if (
      isEmailValid &&
      isUsernameValid &&
      isPasswordValid &&
      isPasswordConfirm
    ) {
      console.log(
        'Input is valid: FH Student receives email for authentication'
      );
    } else {
      console.error(
        'Email or Password is incorrect or the passwords did not match'
      );
    }

    // if the input is not valid show this
  };

  return (
    <SafeAreaView style={stylesLoginReg.container}>
      <Text variant="displayMedium">FH Social </Text>
      <Text variant="displaySmall">St.Pölten</Text>

      {emailError ? (
        <Text style={stylesLoginReg.error}>{emailError}</Text>
      ) : null}
      <TextInput
        label=" Enter email"
        value={email}
        onChangeText={(value) => setEmail(value)}
        mode="outlined"
        style={stylesLoginReg.input}
      />

      {usernameError ? (
        <Text style={stylesLoginReg.error}>{usernameError}</Text>
      ) : null}
      <TextInput
        label=" Enter Username"
        value={username}
        onChangeText={(value) => setUsername(value)}
        mode="outlined"
        style={stylesLoginReg.input}
      />

      {passwordError ? (
        <Text style={stylesLoginReg.error}>{passwordError}</Text>
      ) : null}
      <TextInput
        label="Enter Password"
        value={password}
        onChangeText={(value) => setPassword(value)}
        secureTextEntry
        mode="outlined"
        style={stylesLoginReg.input}
      />
      {confirmError ? (
        <Text style={stylesLoginReg.error}>{confirmError}</Text>
      ) : null}
      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={(value) => setPasswordConfirmation(value)}
        secureTextEntry
        mode="outlined"
        style={stylesLoginReg.input}
      />
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={stylesLoginReg.button}
      >
        Register Account
      </Button>

      <ClickableText
        onPress={handleTextClick}
        text="Want to sign in? LOGIN here."
      />
    </SafeAreaView>
  );
}

export default RegistrationScreen;