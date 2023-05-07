import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Splash from './src/components/Splash';
import loadFonts from './assets/fonts/FontList'; // import fonts
import LoginNavigation from './src/views/LoginNavigation';
import store from './src/redux/app/store';

export default function App() {
  // const pca = new PublicClientApplication(config);
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
      {isLoading ? <Splash /> : <LoginNavigation />}
    </SafeAreaProvider>
  );
}
