import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { useDispatch } from 'react-redux';
import { theme, styles } from '../constants/myTheme';
import { IconStudyProgram, ResearchIcon, NewsIcon } from '../components/svgs';
import {
  setPreventBack,
  setShowOnboarding,
} from '../redux/features/mainSlice/mainSlice';

function Dots({ selected }) {
  let backgroundColor;

  // eslint-disable-next-line prefer-const
  backgroundColor = selected
    ? theme.colors.primary
    : theme.colors.neutralsWhite;

  return (
    <View
      style={{
        width: 16,
        height: 16,
        borderRadius: 72,
        marginHorizontal: 8,
        backgroundColor,
      }}
    />
  );
}

function Skip({ ...props }) {
  return (
    <TouchableOpacity style={{ marginHorizontal: 24 }} {...props}>
      <Text style={[styles.textLink]}>Skip</Text>
    </TouchableOpacity>
  );
}

function Next({ ...props }) {
  return (
    <TouchableOpacity style={{ marginHorizontal: 24 }} {...props}>
      <Text style={[styles.textLink]}>Next</Text>
    </TouchableOpacity>
  );
}

function Done({ ...props }) {
  return (
    <TouchableOpacity style={{ marginHorizontal: 24 }} {...props}>
      <Text style={styles.textLink}>Done</Text>
    </TouchableOpacity>
  );
}

function OnboardingViews({ navigation }) {
  const dispatch = useDispatch();

  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      imageContainerStyles={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 4,
      }}
      containerStyles={{
        justifyContent: 'center',
        alignItems: 'center',
        // justifyContent: 'flex-start',
        // paddingTop: '40%',
        // alignItems: 'center',
        paddingHorizontal: 16,
      }}
      onSkip={() => {
        navigation.replace('LandingScreen');
        dispatch(setShowOnboarding(false));
        dispatch(setPreventBack(true));
      }}
      onDone={() => {
        navigation.replace('LandingScreen');
        dispatch(setShowOnboarding(false));
        dispatch(setPreventBack(true));
      }}
      bottomBarColor={theme.colors.backgroundCamel}
      pages={[
        {
          backgroundColor: theme.colors.backgroundSand,
          image: <IconStudyProgram />,
          title: (
            <Text
              style={[
                styles.headline1,
                { textAlign: 'center', paddingHorizontal: 16 },
              ]}
            >
              Discover Diverse Communities
            </Text>
          ),
          subtitle: (
            <Text
              style={[
                styles.bodyDefault,
                {
                  textAlign: 'center',
                  marginTop: 16,
                  paddingHorizontal: 16,
                  paddingBottom: 100,
                },
              ]}
            >
              Explore Study Programs and Free Time Activities
            </Text>
          ),
        },
        {
          backgroundColor: theme.colors.backgroundSand,
          image: <ResearchIcon />,
          title: (
            <Text
              style={[
                styles.headline1,
                { textAlign: 'center', paddingHorizontal: 16 },
              ]}
            >
              Go Deeper with Subgroups
            </Text>
          ),
          subtitle: (
            <Text
              style={[
                styles.bodyDefault,
                {
                  textAlign: 'center',
                  marginTop: 16,
                  paddingHorizontal: 16,
                  paddingBottom: 100,
                },
              ]}
            >
              Focused Discussions within Main Groups
            </Text>
          ),
        },
        {
          backgroundColor: theme.colors.backgroundSand,
          image: <NewsIcon />,
          title: (
            <Text
              style={[
                styles.headline1,
                {
                  textAlign: 'center',
                  paddingHorizontal: 16,
                },
              ]}
            >
              Engage and Share Knowledges
            </Text>
          ),
          subtitle: (
            <Text
              style={[
                styles.bodyDefault,
                {
                  textAlign: 'center',
                  marginTop: 16,
                  paddingHorizontal: 16,
                  paddingBottom: 100,
                },
              ]}
            >
              Create Posts and Comment in Subgroups
            </Text>
          ),
        },
      ]}
    />
  );
}

export default OnboardingViews;
