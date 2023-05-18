import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { StyleSheet } from 'react-native';
import { theme } from '../../constants/myTheme';

import UserProfileScreen from './UserProfile/UserProfileScreen';
import PersonalDataScreen from './AccountDetails/personalData/PersonalDataScreen';
import InteractedPostsScreen from './AccountDetails/interactedPosts/InteractedPostsScreen';
import JoinedEventsScreen from './AccountDetails/joinedEvents/JoinedEventScreen';
import JoinedGroupsScreen from './AccountDetails/joinedGroups/JoinedGroupsScreen';
import YourPostsEventsScreen from './AccountDetails/yourPostsAndEvents/YourPostsEventsScreen';
import HelpScreen from './AccountDetails/help/HelpScreen';
import AboutUsScreen from './AccountDetails/aboutUs/AboutUsScreen';

export default function UserProfileNavigation() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: theme.colors.onInfo,
          headerStyle: {
            borderBottomWidth: 0,
            borderColor: theme.colors.backgroundWhite,
            backgroundColor: theme.colors.backgroundSand,
          },
        }}
      >
        <Stack.Screen
          name="UserProfile"
          component={UserProfileScreen}
          options={{ title: 'Your Profile', headerShown: false }}
        />
        <Stack.Screen
          name="PersonalData"
          component={PersonalDataScreen}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="YourPostsEvents"
          component={YourPostsEventsScreen}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InteractedPosts"
          component={InteractedPostsScreen}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="JoinedEvents"
          component={JoinedEventsScreen}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="JoinedGroups"
          component={JoinedGroupsScreen}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="help"
          component={HelpScreen}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="aboutUs"
          component={AboutUsScreen}
          // options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
