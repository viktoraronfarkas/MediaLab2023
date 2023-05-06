import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LottieView from 'lottie-react-native';

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F34F34',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontFamily: 'Basic Sans',
    fontSize: '24',
    fontWeight: '700',
  },
});

// This component is used for Overlays (see User-flow: Joined - success message overlay)
// usage example, title can be modified:
// import FullScreenOverlay from './src/components/Overlay/DefaultOverlay';
// <FullScreenOverlay title="Joined" />
export default function FullScreenOverlay({ title }) {
  // eslint-disable-next-line global-require
  const animation = require('../../../assets/Animation/Joined.json');
  return (
    <View style={styles.overlay}>
      <Text style={styles.title}> {title} </Text>
      <LottieView source={animation} autoPlay loop />
    </View>
  );
}
