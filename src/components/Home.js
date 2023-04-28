import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../constants/myTheme';

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text
          style={{
            fontSize: 28,
            textAlign: 'center',
            color: theme.colors.primary,
          }}
        >
          Welcome to the first FH Social App
        </Text>
      </View>
    </SafeAreaView>
  );
}
