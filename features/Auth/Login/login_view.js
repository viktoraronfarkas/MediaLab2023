import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import ClickableText from '../../../src/components/components';
import { useNavigation } from '@react-navigation/native';
import { formStylesLoginReg } from '../ui/form_style'

// TODO Validation for available User inside DB 

/// This is the main representation of the Login Screen for User to login in their account
/// Currently similar to registration Screen
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  // navigate to REGISTRATION Screen
  const navigation = useNavigation();
  const handleTextClick = () => {
    navigation.navigate('RegistrationScreen');
  };

  const validateEmail = (email) => {
    const emailRegex = /[a-z]{2}\d{6}@fhstp\.ac\.at/;
    
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid FH email address.');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  }

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError('Please enter a password that is at least 8 characters long and contains at least one uppercase letter, one lowercase letter, and one number.');
      return false;
    } else {
      setPasswordError('');
        return true;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

     // submit registration form if there are no errors
     isEmailValid && isPasswordValid ? console.log('FH Student is login') :
    
    // if the input is not valid show this
     console.log('email or password is incorrect')
  }



  return (
    <SafeAreaView style={formStylesLoginReg.container}>
    <Text variant="displayMedium">FH Social </Text>
    <Text variant="displaySmall">St.Pölten</Text>
    
    {emailError ? <Text style={formStylesLoginReg.error}>{emailError}</Text> : null}
      <TextInput
        label="Enter Email"
        value={email}
        onChangeText= {(value) => setEmail(value)}
        mode="outlined"
        style={formStylesLoginReg.input}
    />

      {passwordError ? <Text style={formStylesLoginReg.error}>{passwordError}</Text> : null}
      <TextInput
        label="Enter Password"
        value={password}
        onChangeText={(value) => setPassword(value)}
        secureTextEntry
        mode="outlined"
        style={formStylesLoginReg.input}
      />
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={formStylesLoginReg.button}
      >
        Login
      </Button>

      <ClickableText onPress={handleTextClick} text="No account yet? REGISTER now" />
    </SafeAreaView>
  );
};

export default LoginScreen;
