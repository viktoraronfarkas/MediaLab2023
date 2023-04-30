import React, { useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { PublicClientApplication } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';
import ClickableText from '../components/components';
import stylesLoginReg from './Form_style';

// TODO Validation / Authentication for available User inside DB
const msalConfig = {
  auth: {
    clientId: process.env.CLIENT_ID,
    authority: process.env.DIRECTORY_TENANT_ID,
    redirectUri: 'http://localhost:19006',
  },
};
const pca = new PublicClientApplication(msalConfig);

/// This is the main representation of the Login Screen for User to login in their account
/// Currently similar to registration Screen
function LoginScreen() {
  const { instance } = useMsal();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [emailError, setEmailError] = useState('');
  //  const [passwordError, setPasswordError] = useState('');

  const initializeSignIn = () => {
    instance.loginPopup();
  };

  // navigate to REGISTRATION Screen
  const navigation = useNavigation();
  const handleTextClick = () => {
    navigation.navigate('RegistrationScreen');
  };

  /*  const validateEmail = () => {
    const emailRegex = /[a-z]{2}\d{6}@fhstp\.ac\.at/;

    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid FH email address.');
      return false;
    }
    setEmailError('');
    return true;
  }; */

  /* const validatePassword = () => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError(
        'Please enter a password that is at least 8 characters long and contains at least one uppercase letter, one lowercase letter, and one number.'
      );
      return false;
    }
    setPasswordError('');
    return true;
  }; */

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const isEmailValid = validateEmail(email);
    // const isPasswordValid = validatePassword(password);

    try {
      // if (isEmailValid && isPasswordValid) {
      const result = await pca.loginPopup();

      /* const request = await pca.loginPopup({
          scopes: ['password', 'email'],
        }); */
      console.log(result);
      // }
    } catch (error) {
      console.log('login error: ', error);
    }

    /*  // submit registration form if there are no errors
    if (isEmailValid && isPasswordValid) {
      console.log('FH Student is login');
    } else {
      // if the input is not valid show this
      console.log('email or password is incorrect');
    } */
  };

  return (
    <SafeAreaView style={stylesLoginReg.container}>
      <Text variant="displayMedium">FH Social </Text>
      <Text variant="displaySmall">St.Pölten</Text>

      {/*  {emailError ? (
        <Text style={stylesLoginReg.error}>{emailError}</Text>
      ) : null} */}
      <TextInput
        label="Enter Email"
        value={email}
        onChangeText={(value) => setEmail(value)}
        mode="outlined"
        style={stylesLoginReg.input}
      />

      {/*   {passwordError ? (
        <Text style={stylesLoginReg.error}>{passwordError}</Text>
      ) : null} */}
      <TextInput
        label="Enter Password"
        value={password}
        onChangeText={(value) => setPassword(value)}
        secureTextEntry
        mode="outlined"
        style={stylesLoginReg.input}
      />
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={stylesLoginReg.button}
      >
        Login
      </Button>
      <Button
        mode="contained"
        onPress={initializeSignIn}
        style={stylesLoginReg.button}
      >
        Sign In FH
      </Button>

      <ClickableText
        onPress={handleTextClick}
        text="No account yet? REGISTER now"
      />
    </SafeAreaView>
  );
}

export default LoginScreen;
