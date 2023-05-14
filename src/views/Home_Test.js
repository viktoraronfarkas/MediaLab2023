/* eslint-disable global-require */
import React from 'react';
import { StyleSheet, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { theme } from '../constants/myTheme';
import firebase from '../../config';

function handleLogout() {
  firebase
    .auth()
    .signOut()
    .then(() => console.log('User logged out successfully.'))
    .catch((error) => console.error('Error while logging out:', error));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundCamel,
  },
});
export default function Home() {
  return (
    <SafeAreaView edges={['left', 'right']} style={styles.container}>
      <Text> USER LENA </Text>
      <Button title="Log out" onPress={handleLogout} />
    </SafeAreaView>
  );
}
