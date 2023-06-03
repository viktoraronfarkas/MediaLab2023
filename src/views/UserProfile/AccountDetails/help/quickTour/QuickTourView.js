/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { theme } from '../../../../../constants/myTheme';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    flex: 1,
    width: '100%',
  },
});

export default function QuickTourView({ source }) {
  const video = React.useRef(null);
  const [status, setStatus] = useState({});

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={source}
        useNativeControls
        resizeMode={ResizeMode.COVER}
        isLooping
        // eslint-disable-next-line no-shadow
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
    </View>
  );
}
