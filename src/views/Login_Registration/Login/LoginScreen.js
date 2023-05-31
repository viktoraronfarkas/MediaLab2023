import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { theme } from '../../../constants/myTheme';
import LoginView from './LoginView';
import {
  setCurrentUser,
  IpAddress,
  setLoggedIn,
} from '../../../redux/features/mainSlice/mainSlice';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const clientIpAddress = useSelector(IpAddress);
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
      setLoading(true);

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
      console.log(user);
      navigation.navigate('MainScreen');
      dispatch(setCurrentUser(user));

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
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   const subscribe = firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       navigation.navigate('Home');
  //     }
  //   });

  //   return subscribe;
  // }, [navigation]);

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator animating color={theme.colors.primary} />
        </View>
      )}
      <LoginView
        emailError={emailError}
        emailValue={email}
        onChangeTextEmail={(value) => setEmail(value)}
        passwordError={passwordError}
        passwordValue={password}
        onChangeTextPassword={(value) => setPassword(value)}
        handleSubmit={handleSubmit}
        onNavigateText={handleTextClick}
      />
    </View>
  );
}
