import React from 'react';
import { SafeAreaView, View, ScrollView, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { theme } from '../../../../../constants/myTheme';

/**
 * This is the main Help View
 */
export default function QuickTourView({ source }) {
  const { width, height } = Dimensions.get('window');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{
          paddingHorizontal: 5,
          backgroundColor: theme.colors.backgroundCamel,
        }}
      >
        <View style={{ margin: 0, paddingBottom: 30 }}>
          <Video
            source={source}
            shouldPlay
            isLooping
            resizeMode="contain"
            style={{ width, height }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
