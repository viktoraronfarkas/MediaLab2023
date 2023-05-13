import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { theme } from '../../../constants/myTheme';
import RegistrationPageOneView from './RegistrationPageOneView';
import RegistrationPageTwoView from './RegistrationPageTwoView';
import RegistrationPageThreeView from './RegistrationPageThreeView';

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

  // Handle Navigation
  const RegistrationStack = createStackNavigator();
  const navigation = useNavigation();
  const handleTextLoginClick = () => {
    navigation.navigate('LoginScreen');
  };
  const handlePage2Click = () => {
    navigation.navigate('RegistrationTwo');
  };
  const handlePage3Click = () => {
    navigation.navigate('RegistrationThree');
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const isEmailValid = validateEmail(email);
    const isUsernameValid = validateUsername(username);
    const isNameValid = validateName(name);
    const isPasswordValid = validatePassword(password);
    const isPasswordConfirm = handlePasswordConfirmationChange(confirmPassword);

    // submit registration form if there are no errors
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
      console.log(selectedNames);
    } else {
      console.error(
        'Email or Password is incorrect or the passwords did not match'
      );
      console.log(selectedNames);
    }
  };

  return (
    <RegistrationStack.Navigator
      screenOptions={{
        headerBackTitle: 'Go Back',
        headerStyle: {
          borderBottomWidth: 0,
          backgroundColor: theme.colors.backgroundSand,
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
        style={style.container}
        options={{ title: 'Step 2 of 3' }}
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
          />
        )}
      </RegistrationStack.Screen>
    </RegistrationStack.Navigator>
  );
}
