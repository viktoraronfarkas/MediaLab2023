import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Splash from './src/components/Splash';
import loadFonts from './assets/fonts/FontList'; // import fonts
// import ScreenNavigation from './src/views/Login_Registration/ScreenNavigation';
import UserProfileScreenNavigation from './src/views/UserProfile/UserProfileNavigation';
import store from './src/redux/app/store';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadApp() {
      // loading the fonts in the app
      await loadFonts();

      // simulate a 2-second loading process , later it should be until the data is fetched
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }

    loadApp();
  }, []);

  return (
    <SafeAreaProvider store={store}>
      {isLoading ? <Splash /> : <UserProfileScreenNavigation />}
    </SafeAreaProvider>
  );
}
