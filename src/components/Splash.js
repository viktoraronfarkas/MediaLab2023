import React, { useRef, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import Animation from './animation';

export default function Splash() {
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Animation source={require('../../assets/Animation/FHLOGO.json')} />
    </SafeAreaView>
  );
}
