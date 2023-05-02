import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useMsal, useAccount } from '@azure/msal-react';
// import { Navigation } from 'react-native-navigation';
import config from '../Auth/authConfig';

// DELETE: DON'T USE THIS
export default function RegisterAuth() {
  const { instance } = useMsal();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const account = useAccount();

  useEffect(() => {
    if (account) {
      setIsAuthenticated(true);
      /*  Navigation.setRoot({
        root: {
          stack: {
            children: [
              {
                component: {
                  name: 'Home',
                },
              },
            ],
          },
        },
      }); */
    } else {
      setIsAuthenticated(false);
    }
  }, [account]);

  const handleRegister = async () => {
    await instance.loginPopup(config.scopes);
  };

  const handleLogout = async () => {
    await instance.logout();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isAuthenticated ? (
        <>
          <Text>You are logged in as {account?.name}.</Text>
          <Button title="Logout" onPress={handleLogout} />
        </>
      ) : (
        <Button title="Login" onPress={handleRegister} />
      )}
    </View>
  );
}
