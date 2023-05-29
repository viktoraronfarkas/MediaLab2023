import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ImageBackground, SafeAreaView, Text, View } from 'react-native';
import plusIcon from '../../assets/Icons/plus-icon.png';
import circleLineImage from '../../assets/Images/circleLine-image.png';
// import glitterImage from '../../assets/Images/glitter-image.png';
import heartLeftImage from '../../assets/Images/heart-left-image.png';
import JoinGroupImage from '../../assets/Images/join-group.png';
import starImage from '../../assets/Images/star-image.png';
import BackButton from '../components/Buttons/BackButton';
import { MoreSvg } from '../components/svgs';
import { styles, theme } from '../constants/myTheme';

function AddSubgroup() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack(null);
  };
  return (
    <SafeAreaView
      style={{ backgroundColor: theme.colors.backgroundSand, flex: 1 }}
    >
      <View style={{ marginTop: 20 }}>
        <BackButton text="back" onPress={handlePress} />
      </View>

      <View style={{ marginTop: 20, marginBottom: 20, alignItems: 'center' }}>
        <MoreSvg
          color="#000"
          width={30}
          height={50}
          style={{
            position: 'absolute',
            top: -30,
            left: 320,
            right: 20,
            bottom: 20,
          }}
        />
        <Image
          source={heartLeftImage}
          style={{
            width: 60,
            height: 50,
            position: 'absolute',
            top: 50,
            left: 20,
            right: 100,
            bottom: 20,
          }}
        />
        <Image
          source={starImage}
          style={{
            width: 22,
            height: 30,
            position: 'absolute',
            top: 10,
            left: 50,
            right: 100,
            bottom: 20,
          }}
        />

        <ImageBackground
          source={circleLineImage}
          style={{ width: 240, height: 80 }}
        >
          <Text
            style={[styles.headline1, { textAlign: 'center', marginTop: 20 }]}
          >
            [StudyProgram]
          </Text>
        </ImageBackground>
      </View>

      <View style={{ marginTop: 20, marginBottom: 20, alignItems: 'center' }}>
        <Text style={[styles.headline3, { textAlign: 'center' }]}>
          Join the Group to get all the infos about this study programme!
        </Text>
      </View>

      <View style={{ marginTop: 20, marginBottom: 20, alignItems: 'center' }}>
        <Image source={plusIcon} style={{ width: 60, height: 60 }} />
        <Text style={styles.headline2}>Join Me!</Text>
      </View>

      <View style={{ flex: 1, alignContent: 'center' }}>
        <Image source={JoinGroupImage} style={{ width: 400, height: 400 }} />
      </View>
    </SafeAreaView>
  );
}

export default AddSubgroup;
