import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNav from '../components/BottomNavigation';

export default function Main() {
  return (
    <SafeAreaView
      edges={['left', 'right']}
      style={{ flex: 1, backgroundColor: 'red' }}
    >
      <View style={{ flex: 1, backgroundColor: 'red' }}>
        <BottomNav />
      </View>
    </SafeAreaView>
  );
}
