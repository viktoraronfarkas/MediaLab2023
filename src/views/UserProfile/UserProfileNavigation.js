import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { StyleSheet } from 'react-native';
import { theme } from '../../constants/myTheme';

import UserProfileScreen from './UserProfile/UserProfileScreen';
import PersonalDataScreen from './AccountDetails/personalData/PersonalDataScreen';

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
        {/* <Stack.Screen
          name="YourPostsEvents"
          component={YourPostsEvents}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InteractedPosts"
          component={InteractedPosts}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="JoinedEvents"
          component={JoinedEvents}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="JoinedGroups"
          component={JoinedGroups}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="help"
          component={HelpUserProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="aboutUs"
          component={AboutUs}
          options={{ headerShown: false }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
