import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { theme } from '../constants/myTheme';

function OnboardingScreens() {
  return (
    <Onboarding
      pages={[
        {
          backgroundColor: theme.colors.backgroundSand,
          image: (
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require('../../assets/Images/join-group.png')}
              />
            </View>
          ),
          title: (
            <View style={styles.contentContainer}>
              <Text style={styles.title}>Welcome</Text>
              <Text style={styles.subtitle}>
                Welcome to UASync! We are all about connecting students of the
                UAS and provide a platform to share and find information. There
                are various groups for every study programme or other
                activities.
              </Text>
            </View>
          ),
          subtitle: '',
        },
        {
          backgroundColor: theme.colors.backgroundSand,
          image: (
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require('../../assets/Images/join-group.png')}
              />
            </View>
          ),
          title: (
            <View style={styles.contentContainer}>
              <Text style={styles.title}>Welcome</Text>
              <Text style={styles.subtitle}>
                Welcome to UASync! We are all about connecting students of the
                UAS and provide a platform to share and find information. There
                are various groups for every study programme or other
                activities.
              </Text>
            </View>
          ),
          subtitle: '',
        },
        {
          backgroundColor: theme.colors.backgroundSand,
          image: (
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require('../../assets/Images/join-group.png')}
              />
            </View>
          ),
          title: (
            <View style={styles.contentContainer}>
              <Text style={styles.title}>Welcome</Text>
              <Text style={styles.subtitle}>
                Welcome to UASync! We are all about connecting students of the
                UAS and provide a platform to share and find information. There
                are various groups for every study programme or other
                activities.
              </Text>
            </View>
          ),
          subtitle: '',
        },
        // ...rest of the pages
      ]}
    />
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 270,
    height: 215,
  },
  contentContainer: {
    position: 'absolute',
    bottom: 150,
    paddingHorizontal: 20,
    alignItems: 'center',
    zIndex: 1, // Set a higher z-index to place it above the image
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.black,
    textAlign: 'center',
    // marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.black,
    textAlign: 'center',
  },
});

export default OnboardingScreens;
