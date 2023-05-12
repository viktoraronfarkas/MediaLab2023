import React from 'react';
import { Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OrangeButton from '../components/Buttons/OrangeButton';
import { View } from 'react-native';

const StartingScreenHeadline = () => (
  <Image
    style={{}}
    source={require('../../assets/Images/starting-screen-headline.svg')}
  />
);

const StartingScreen = () => (
  <SafeAreaView>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'centers' }}>
      <StartingScreenHeadline />
      <OrangeButton text="Log in" />
      <OrangeButton text="Register" />
    </View>
  </SafeAreaView>
);

export default StartingScreen;
