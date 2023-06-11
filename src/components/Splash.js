import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native'
import Animation from './animation';
import LandingScreen from '../../assets/Animation/Landing.json';
import { theme } from '../constants/myTheme';

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
  },
  animation: {
    flex: 1,
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
      <View style={style.container}>
        <Animation source={LandingScreen} style={style.animation}/>
      </View>
    </SafeAreaView>
  );
}
