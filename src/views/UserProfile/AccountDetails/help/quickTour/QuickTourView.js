import React from 'react';
import { SafeAreaView, View, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { theme } from '../../../../../constants/myTheme';

/**
 * This is the main Help View
 */
export default function QuickTourView({ source }) {
  const { width, height } = Dimensions.get('window');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.backgroundCamel }}>
        <View style={{ margin: 0, paddingBottom: 30 }}>
          <Video
            source={source}
            shouldPlay
            isLooping
            resizeMode="cover"
            style={{ width, height }}
          />
        </View>
    </SafeAreaView>
  );
}
