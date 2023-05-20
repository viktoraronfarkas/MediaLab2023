import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ImageBackground, Image } from 'react-native';
import { styles, theme } from '../constants/myTheme';
import BackButton from '../components/Buttons/BackButton';
import OrangeButton from '../components/Buttons/OrangeButton';
import underlineImage from '../../assets/Images/thin-underline-image.png';
import circleLineImage from '../../assets/Images/circleLine-image.png';
import UnderlineImageSmall from '../../assets/Images/under-line-image.png';
import Foodshare from '../../assets/foodshare.jpg';

function PostInteraction() {
  return (
    <SafeAreaView
      style={{ backgroundColor: theme.colors.backgroundSand, flex: 1 }}
    >
      <View style={{ margin: 20 }}>
        <View style={{ marginBottom: 15, marginTop: 20 }}>
          <BackButton text="back" />
        </View>
        <View style={{ alignItems: 'center', marginTop: 50 }}>
          <Text style={[styles.headline1, { textAlign: 'center' }]}>
            Study Session
          </Text>
          <Image source={underlineImage} style={{ width: 340, height: 30 }} />
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 80,
            }}
          >
            <Text style={[styles.headline2]}>02.07</Text>
            <Image
              source={UnderlineImageSmall}
              style={{
                width: 120,
                height: 8,
              }}
            />
          </View>
          <ImageBackground
            source={circleLineImage}
            style={{
              width: 120,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={[styles.headline2]}>15:30</Text>
          </ImageBackground>
        </View>
        <Text style={[styles.bodyDefault, { marginTop: 50 }]}>
          Hey everyone we will meet up in the cafeteria and will study there or
          move somewhere else. It is gonna be open end. The more the better! if
          you need to contact me my number is: +43 000 0000000
        </Text>

        <OrangeButton text="Join Event" style={{ marginTop: 20 }} />

        <View style={{ flexDirection: 'row', marginTop: 80 }}>
          <Text style={[styles.headline3]}>Organised by:</Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 50 / 2,
                overflow: 'hidden',
                marginLeft: 5,
                marginTop: -10,
              }}
            >
              <Image
                source={Foodshare}
                style={{ flex: 1, width: null, height: null }}
                resizeMode="cover"
              />
            </View>
            <Text
              style={[styles.subtitle1, { marginLeft: 10, marginBottom: 5 }]}
            >
              Username
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 30 }}>
          <Text style={[styles.headline3]}>People joining:</Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={[styles.subtitle1, { marginLeft: 10 }]}>33</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default PostInteraction;
