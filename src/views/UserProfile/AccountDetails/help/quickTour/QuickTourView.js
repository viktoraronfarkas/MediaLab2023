/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    flex: 1,
    width: '100%',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonText: {
    color: '#FFF',
    fontSize: 24,
  },
});

export default function QuickTourView({ source }) {
  const video = React.useRef(null);
  const [status, setStatus] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const handlePlayPause = async () => {
    if (isPlaying) {
      await video.current.pauseAsync();
    } else {
      await video.current.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.video}
        activeOpacity={1}
        onPress={() => {
          setShowButton(false);
        }}
      >
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
      </TouchableOpacity>
      {!isPlaying && showButton && (
        <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
          <Text style={styles.playButtonText}>▶</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
