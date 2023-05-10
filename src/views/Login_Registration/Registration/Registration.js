import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import RegistrationView from './RegistrationView';


// TODO Check if username already exists in the DB
// TODO onSubmit it should direct to authentication Screen and User should receive an Email to authenticate
// TODO DELETE Console logs
// TODO After Authentication create new User to DB

/// This is the main representation of the Registration Screen for User to create an account
function RegistrationScreen() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setPasswordConfirmation] = useState('');
  const [confirmError, setConfirmError] = useState('');


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
  const validateName = () => {
    // TODO ADJUST
    const nameRegex = /^[a-zA-Z0-9]+$/;

    if (!nameRegex.test(name)) {
      setNameError('Please enter a username that contains only letters.');
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

  const handlePage2Click = () => {
    navigation.navigate('RegistrationTwo');
  };
  const handlePage3Click = () => {
    navigation.navigate('RegistrationThree');
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const isEmailValid = validateEmail(email);
    const isUsernameValid = validateUsername(username);
    const isNameValid = validateName(name);
    const isPasswordValid = validatePassword(password);
    const isPasswordConfirm = handlePasswordConfirmationChange(confirmPassword);

    // submit registration form if there are no errors
    // TODO delete console log after backend implementation
    if (
      isEmailValid &&
      isUsernameValid &&
      isNameValid &&
      isPasswordValid &&
      isPasswordConfirm
    ) {
      navigation.navigate('MainScreen');
      console.log(
        'Input is valid: FH Student receives email for authentication'
      );
    } else {
      console.error(
        'Email or Password is incorrect or the passwords did not match'
      );
    }
  };

  return (
    <RegistrationView
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

      // onPressProfileImageUpload={(value) => setProfileImageUpload(value)}

      // Navigation
      onNavigateText={handleTextClick} // To Login
      onNavigatePage2={handlePage2Click}
      onNavigatePage3={handlePage3Click}
      handleSubmit={handleSubmit}
    />
   
  );
}

export default RegistrationScreen;
