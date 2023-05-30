import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

import { styles, theme } from '../../constants/myTheme';
import Animation from '../animation';

const style = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
  },
});

/**
 * This component is used for Overlays (see User-flow: Joined - success message overlay.
 * Usage example, title can be modified:
 *
 * < FullScreenOverlay title="Joined" />
 */

export default function FullScreenOverlay({ title }) {
  const animation = require('../../../assets/Animation/Joined.json');

  return (
    <SafeAreaView style={style.overlay}>
      <Text style={[styles.headline1, { color: theme.colors.backgroundWhite }]}>
        {title}
      </Text>
      <Animation source={animation} />
      {/* <LottieView source={animation} autoPlay loop /> */}
    </SafeAreaView>
  );
}
