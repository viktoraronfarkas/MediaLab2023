import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, View } from 'react-native';
// import { StyleSheet } from 'react-native';
// import { theme } from '../../constants/myTheme';
import CaptionScribbleHeading from '../../components/Texts/CaptionScribbleHeading';
import scribble from '../../../assets/Images/heart-right-image.png';
import underline from '../../../assets/Images/under-line-image.png';
import arrow from '../../../assets/Images/arrow-image.png';

// import PersonalData from './PersonalData';

export default function UserProfile() {
  //   const Stack = createStackNavigator();

  return (
    <SafeAreaView edges={['left', 'right', 'top']} style={{ flex: 1 }}>
      <View>
        <CaptionScribbleHeading
          subHeading="Only you"
          title="Your Profile"
          scribbleSubHeadingImage={scribble}
          underlineImage={underline}
          arrowImage={arrow}
          lineStyle={{ height: 50, width: 50 }}
        />
      </View>
    </SafeAreaView>
  );
}
