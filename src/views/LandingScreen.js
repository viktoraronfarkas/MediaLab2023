import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { styles, theme } from '../constants/myTheme';
import OrangeButton from '../components/Buttons/OrangeButton';
import SingeFrameImage from '../../assets/Images/single-frame.png';
import LetsConnectImage from '../../assets/Images/lets-connect-image.png';
import { setPreventBack } from '../redux/features/mainSlice/mainSlice';

const windowHeight = Dimensions.get('window').height;

const style = StyleSheet.create({
  mainTitle: { 
    textAlign: 'center', 
    fontSize: 40, 
    paddingTop: 20, 
    paddingBottom: 20 
  },
  
  frameContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: -70,
  },

  frameImage: {
    height: windowHeight * 0.4, // Adjust the height based on the screen height
    width: windowHeight * 0.4,
  },

  LetsConnectContainer: {
    alignItems: 'center',
  },
  LetsConnectImage: {
    height: windowHeight * 0.5, // Adjust the height based on the screen height
    width: windowHeight * 0.5,
  },

  buttonStyle: {
    alignSelf: 'center',
    width: '100%',
  },
});

/**
 * This is the very first Screen, if the user is not logged in.
 * It can be navigated to the Login / Register Screen.
 */
export default function LandingScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const navigateLogin = () => {
    navigation.navigate('LoginScreen');
    dispatch(setPreventBack(false));
  };
  const navigateRegister = () => {
    navigation.navigate('RegistrationOne');
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.backgroundSand, marginTop: 35 }}
    >
      <View style={style.frameContainer}>
        <Image
          style={style.frameImage}
          source={SingeFrameImage}
          resizeMode="contain"
        />
      </View>

      <Text style={[styles.headline1, style.mainTitle]}>UASync</Text>

      <View style={style.LetsConnectContainer}>
        <Image
          style={style.LetsConnectImage}
          source={LetsConnectImage}
          resizeMode="contain"
        />
      </View>

      <View style={{ marginBottom: 10, alignItems: 'center' }}>
        <Text style={styles.headline1}>Register Below:</Text>
      </View>

      <View style={{ alignItems: 'center' }}>
        <Text
          style={[
            styles.bodyDefault,
            { textAlign: 'center', paddingHorizontal: 20 },
          ]}
        >
          Welcome to UASync! To join our community and start to connect, just
          register below or log in and get going:
        </Text>
      </View>

      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <OrangeButton
          text="Login"
          styleButton={style.buttonStyle}
          onPress={navigateLogin}
        />
      </View>
      <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
        <OrangeButton
          text="Register"
          styleButton={style.buttonStyle}
          onPress={navigateRegister}
        />
      </View>
    </SafeAreaView>
  );
}
