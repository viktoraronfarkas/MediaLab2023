import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animation from './animation';

export default function Splash() {
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Animation source='../../assets/Animation/FHLOGO.json' />
    </SafeAreaView>
  );
}
