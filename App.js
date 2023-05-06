import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import Splash from './src/components/Splash';
import LoginNavigation from './src/views/LoginNavigation';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // simulate a 2-second loading process , later it should be until the data is fetched
  }, []);
  return (
    <SafeAreaProvider>
      {isLoading ? <Splash /> : <LoginNavigation />}
    </SafeAreaProvider>
  );
}
