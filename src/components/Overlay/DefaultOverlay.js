import React from 'react';
import { View } from 'react-native';
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
});

const stylesAnimation = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function FullScreenOverlay({ animation }) {
  return (
    <View style={styles.overlay}>
      <LottieView source={animation} autoPlay loop />
    </View>
  );
}

export default function App() {
  // eslint-disable-next-line global-require
  const animation = require('../../../assets/Animation/Joined.json');
  return (
    <View style={stylesAnimation.container}>
      <FullScreenOverlay animation={animation} />
    </View>
  );
}
