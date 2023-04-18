import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import Splash from './src/components/Splash';
import Home from './src/components/Home';
import store from './src/redux/app/store';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // simulate a 2-second loading process , later it should be until the data is fetched
  }, []);
  return (
    <Provider store={store}>
      <SafeAreaProvider>{isLoading ? <Splash /> : <Home />}</SafeAreaProvider>
    </Provider>
  );
}
