import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native'
import Animation from './animation';
import LandingScreen from '../../assets/Animation/Landing.json';

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
});

/**
 * This shows the splash screen animation.
 */
export default function Splash() {
  return (
    <SafeAreaView
      style={style.container}
    >
      <Animation source={LandingScreen} />
    </SafeAreaView>
  );
}
