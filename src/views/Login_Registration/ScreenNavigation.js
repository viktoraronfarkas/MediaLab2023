import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { theme } from '../../constants/myTheme';

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

import LandingScreen from '../LandingScreen';
import LoginScreen from './Login/LoginScreen';
import RegistrationScreen from './Registration/RegistrationScreen';
import BackButtonNavigationContainer from '../../components/Buttons/BackButtonNavigationContainer';
import Main from '../Main';
import JoinGroup from '../JoinGroupScreen';
import JoinedSubgroup from '../JoinedSubgroup';
import AddSubgroup from '../AddSubgroup';
import {
  setLoggedIn,
  loggedIn,
} from '../../redux/features/mainSlice/mainSlice';
import JoinNewGroup from '../JoinNewGroup';

/**
 * This is the main Navigation file of most of the screens.
 */
export default function ScreenNavigation() {
  const Stack = createStackNavigator();
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector(loggedIn);

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

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
          headerBackImage: () => <BackButtonNavigationContainer text="back" />,
          headerStyle: {
            backgroundColor: theme.colors.backgroundSand,
            borderBottomWidth: 0,
            borderBottomColor: theme.colors.backgroundSand,
          },
          // headerShown: false,
        }}
      >
        {isUserLoggedIn ? (
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
              name="JoinedSubgroup"
              component={JoinedSubgroup}
              options={{ title: '', headerShown: false }}
            />
            <Stack.Screen name="AddSubgroup" component={AddSubgroup} />
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
            {/*  <Stack.Screen
          name="quickTour"
          component={QuickTour}
         
        /> */}
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
          </>
        ) : (
          <>
            <Stack.Screen
              name="LandingScreen"
              component={LandingScreen}
              options={{ title: '', headerShown: false }}
            />

            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
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
