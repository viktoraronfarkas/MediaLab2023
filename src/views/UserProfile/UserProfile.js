import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, View, Image } from 'react-native';
// import { StyleSheet } from 'react-native';
import { theme } from '../../constants/myTheme';
import CaptionScribbleHeading from '../../components/Texts/CaptionScribbleHeading';
import scribble from '../../../assets/Images/heart-right-image.png';
import underline from '../../../assets/Images/under-line-image.png';
import arrow from '../../../assets/Images/arrow-image.png';

import scribbleFrame from '../../../assets/Images/profile-frame.png';
import defaultProfileImage from '../../../assets/food.png';

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: theme.colors.backgroundSand,
  },

  imageUploadedContainer: {
    paddingVertical: 40,
    flexDirection: 'column',
  },
  infoImageContainer: {
    paddingVertical: 40,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: theme.colors.neutralsWhite,
    borderWidth: 4,
  },

  scribbleFrame: {
    position: 'absolute',
    // top: 85,
    // left: 60,
    height: 100,
    width: 100,
    alignItems: 'center',
  },
});

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

      <View style={style.imageUploadedContainer}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={{ uri: defaultProfileImage }}
            style={style.profileImage}
          />
          <Image
            style={[style.scribbleFrame]}
            source={scribbleFrame}
            resizeMode="contain"
          />
        </View>
      </View>

      <View />
    </SafeAreaView>
  );
}
