/* eslint-disable no-nested-ternary */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { theme } from '../../constants/myTheme';
import VerifyEmailScreen from './VerifyEmailScreen';
import UserProfileScreen from '../UserProfile/UserProfile/UserProfileScreen';
import PersonalDataScreen from '../UserProfile/AccountDetails/personalData/PersonalDataScreen';
import InteractedPostsScreen from '../UserProfile/AccountDetails/interactedPosts/InteractedPostsScreen';
import JoinedEventsScreen from '../UserProfile/AccountDetails/joinedEvents/JoinedEventScreen';
import JoinedGroupsScreen from '../UserProfile/AccountDetails/joinedGroups/JoinedGroupsScreen';
import YourPostsEventsScreen from '../UserProfile/AccountDetails/yourPostsAndEvents/YourPostsEventsScreen';
import HelpScreen from '../UserProfile/AccountDetails/help/HelpScreen';
import AboutUsScreen from '../UserProfile/AccountDetails/aboutUs/AboutUsScreen';
import DataSecurity from '../DataSecurity';
import CommunityGuidelines from '../CommunityGuidelines';
import QuickTour from '../UserProfile/AccountDetails/help/quickTour/QuickTourScreen';

import LandingScreen from '../LandingScreen';
import LoginScreen from './Login/LoginScreen';
import RegistrationScreen from './Registration/RegistrationScreen';
import BackButtonNavigationContainer from '../../components/Buttons/BackButtonNavigationContainer';
import Main from '../Main';
import JoinGroup from '../JoinGroupScreen';
import Subgroup from '../Subgroup';
import AddSubgroup from '../AddSubgroup';
import AddPost from '../Add_Post';
import {
  setLoggedIn,
  loggedIn,
  preventBack,
  showOnboarding,
} from '../../redux/features/mainSlice/mainSlice';
import JoinNewGroup from '../JoinNewGroup';
import OnboardingViews from '../OnboardingViews';

/**
 * This is the main Navigation file of most of the screens.
 */
export default function ScreenNavigation() {
  const Stack = createStackNavigator();
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector(loggedIn);
  const isBackPrevented = useSelector(preventBack);
  const isShowOnboarding = useSelector(showOnboarding);

  useEffect(() => {
    AsyncStorage.getItem('userID')
      .then((userID) => {
        if (userID) {
          dispatch(setLoggedIn(true));
        }
      })
      .catch((error) => {
        console.log('Error retrieving userID:', error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (AsyncStorage.getItem('userID'))
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerBackTitleVisible: false,
            headerBackImage: () => (
              <BackButtonNavigationContainer text="back" />
            ),
            headerStyle: {
              backgroundColor: theme.colors.backgroundSand,
              borderBottomWidth: 0,
              borderBottomColor: theme.colors.backgroundSand,
            },
            // headerShown: false,
          }}
        >
          {isShowOnboarding ? (
            <>
              <Stack.Screen
                name="OnboardingViews"
                component={OnboardingViews}
                options={{ title: '', headerShown: false }}
              />
              <Stack.Screen
                name="LandingScreen"
                component={LandingScreen}
                options={{
                  title: '',
                  headerShown: false,
                  gestureEnabled: false,
                }}
              />
              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{
                  title: '',
                  headerShown: false,
                  // eslint-disable-next-line no-unneeded-ternary
                  gestureEnabled: isBackPrevented ? false : true,
                }}
              />
              <Stack.Screen
                name="VerifyEmailScreen"
                component={VerifyEmailScreen}
                options={{ title: '', headerShown: false }}
              />
              <Stack.Screen
                name="RegistrationOne"
                component={RegistrationScreen}
                options={{ title: '', headerShown: false }}
              />
            </>
          ) : isUserLoggedIn ? (
            <>
              <Stack.Screen
                name="MainScreen"
                component={Main}
                options={{ title: '', headerShown: false }}
              />
              <Stack.Screen
                name="JoinGroupScreen"
                component={JoinGroup}
                options={{ title: '', headerShown: false }}
              />
              <Stack.Screen
                name="Subgroup"
                component={Subgroup}
                options={{ title: '', headerShown: false }}
              />
              <Stack.Screen
                name="AddSubgroup"
                component={AddSubgroup}
                options={{ title: '', headerShown: true }}
              />
              <Stack.Screen
                name="UserProfile"
                component={UserProfileScreen}
                options={{ title: '', headerShown: false }}
              />
              <Stack.Screen
                name="PersonalData"
                component={PersonalDataScreen}
                options={{ title: '' }}
              />
              <Stack.Screen
                name="YourPostsEvents"
                component={YourPostsEventsScreen}
                options={{ title: '' }}
              />
              <Stack.Screen
                name="InteractedPosts"
                component={InteractedPostsScreen}
                options={{ title: '' }}
              />
              <Stack.Screen
                name="JoinedEvents"
                component={JoinedEventsScreen}
                options={{ title: '' }}
              />
              <Stack.Screen
                name="JoinedGroups"
                component={JoinedGroupsScreen}
                options={{ title: '' }}
              />
              <Stack.Screen
                name="help"
                component={HelpScreen}
                options={{ title: '' }}
              />
              <Stack.Screen
                name="aboutUs"
                component={AboutUsScreen}
                options={{ title: '' }}
              />
              <Stack.Screen
                name="addPost"
                component={AddPost}
                options={{ title: '' }}
              />
              <Stack.Screen
                name="quickTour"
                component={QuickTour}
                options={{ title: '' }}
              />
              <Stack.Screen
                name="communityGuidelines"
                component={CommunityGuidelines}
                options={{ title: '' }}
              />
              <Stack.Screen
                name="dataSecurity"
                component={DataSecurity}
                options={{ title: '' }}
              />
              <Stack.Screen
                name="JoinNewGroup"
                component={JoinNewGroup}
                options={{ title: '', headerShown: false }}
              />
              <Stack.Screen
                name="VerifyEmailScreen"
                component={VerifyEmailScreen}
                options={{ title: '', headerShown: false }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="LandingScreen"
                component={LandingScreen}
                options={{
                  title: '',
                  headerShown: false,
                  gestureEnabled: false,
                }}
              />

              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{
                  title: '',
                  headerShown: false,
                  // eslint-disable-next-line no-unneeded-ternary
                  gestureEnabled: isBackPrevented ? false : true,
                }}
              />
              <Stack.Screen
                name="VerifyEmailScreen"
                component={VerifyEmailScreen}
                options={{ title: '', headerShown: false }}
              />
              <Stack.Screen
                name="RegistrationOne"
                component={RegistrationScreen}
                options={{ title: '', headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
}
