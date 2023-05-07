import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animation from './animation';
import FHLogoAnimation from '../../assets/Animation/FHLOGO.json';

/**
 * This shows the splash screen animation.
 */
export default function Splash() {
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Animation source={FHLogoAnimation} />
    </SafeAreaView>
  );
}
