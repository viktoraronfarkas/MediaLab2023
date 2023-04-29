import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animation from './animation';
import splash from '../../assets/Animation/splash.json';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
export default function Splash() {
  return (
    <SafeAreaView style={styles.container}>
      <Animation resizeMode="cover" source={splash} />
    </SafeAreaView>
  );
}
