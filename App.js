import { React, useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { MsalProvider } from '@azure/msal-react';
// import { PublicClientApplication } from '@azure/msal-browser';
// import config from './src/Auth/authConfig';
import Splash from './src/components/Splash';
import LoginNavigation from './src/views/LoginNavigation';

export default function App() {
  // const pca = new PublicClientApplication(config);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // simulate a 2-second loading process , later it should be until the data is fetched
  }, []);
  return (
    <SafeAreaProvider>
      {isLoading ? (
        <Splash />
      ) : (
        <LoginNavigation />
        // <MsalProvider
        //   instance={pca}
        //  config={config}
        //   webviewProps={{ sharedCookiesEnabled: true }}
        //  >
        // </SafeAreaProvider>    <LoginAuth />
        //  </MsalProvider>
      )}
    </SafeAreaProvider>
  );
}
