import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useDispatch, useSelector } from 'react-redux';
import loadFonts from './assets/fonts/FontList'; // import fonts
import ScreenNavigation from './src/views/Login_Registration/ScreenNavigation';

// import UserAuthentication from './src/views/Login_Registration/UserAuthentication';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import loadFonts from './assets/fonts/FontList';
import UserAuthentication from './src/views/Login_Registration/UserAuthentication';
import Splash from './src/components/Splash';
import store from './src/redux/app/store';
import {
  IpAddress,
  setMainGroups,
  setShowOnboarding,
} from './src/redux/features/mainSlice/mainSlice';

function RootComponent() {
  const [isLoading, setIsLoading] = useState(true);
  const clientIpAddress = useSelector(IpAddress);
  const dispatch = useDispatch();

  const fetchMainGroups = async () => {
    try {
      const response = await axios.get(
        `http://${clientIpAddress}:3001/maingroup`
      );
      const mainGroupsData = response.data;
      dispatch(setMainGroups(mainGroupsData));
    } catch (error) {
      console.error('Error retrieving main groups:', error);
      // Handle the error
    }
  };

  useEffect(() => {
    async function loadApp() {
      // loading the fonts in the app
      await loadFonts();

      // Fetch the main groups data
      await fetchMainGroups();

      setIsLoading(false);
    }

    loadApp();
  }, []);

  useEffect(() => {
    async function checkFirstLaunch() {
      try {
        const Firstlaunched = await AsyncStorage.getItem('Firstlaunched');
        if (Firstlaunched === null) {
          // First launch, set onboarding to true
          dispatch(setShowOnboarding(true));
          await AsyncStorage.setItem('Firstlaunched', 'true');
        } else {
          // Not the first launch, set onboarding to false
          dispatch(setShowOnboarding(false));
        }
      } catch (error) {
        console.log('Error retrieving Firstlaunched:', error);
      }
    }

    checkFirstLaunch();
  }, []);

  if (isLoading) {
    return <Splash />;
  }
  return <ScreenNavigation />;
  //return <UserAuthentication />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <RootComponent />
      </Provider>
    </SafeAreaProvider>
  );
}
