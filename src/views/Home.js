import React, { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';
import Animation from '../components/animation';

const SplashContent = () => {
  <SafeAreaView
    style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
  >
    <Animation source="../../assets/Animation/FHLOGO.json" />
  </SafeAreaView>;
};

const HomeContent = () => {
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 28, textAlign: 'center' }}>
        Welcome to the first FH Social App
      </Text>
    </View>
  </SafeAreaView>;
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // simulate a 2-second loading process , later it should be until the data is fetched
  }, []);
  return (
    <SafeAreaProvider>
      {isLoading ? <SplashContent /> : <HomeContent />}
    </SafeAreaProvider>
  );
}
