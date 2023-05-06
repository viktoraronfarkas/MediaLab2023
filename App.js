import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Splash from './src/components/Splash';
import LoginNavigation from './src/views/LoginNavigation';
import store from './src/redux/app/store';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // simulate a 2-second loading process , later it should be until the data is fetched
  }, []);
  return (
    <SafeAreaProvider store={store}>
      {isLoading ? <Splash /> : <LoginNavigation />}
    </SafeAreaProvider>
  );
}
