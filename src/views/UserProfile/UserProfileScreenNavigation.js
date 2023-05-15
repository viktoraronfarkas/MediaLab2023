import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { StyleSheet } from 'react-native';
import { theme } from '../../constants/myTheme';

import UserProfile from './UserProfile';
// import PersonalData from './PersonalData';

export default function UserProfileScreenNavigation() {
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
          component={UserProfile}
          options={{ title: 'Your Profile' }}
        />
        {/* <Stack.Screen
          name="PersonalData"
          component={PersonalData}
          options={{ headerShown: false }}
        />
        <Stack.Screen
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
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
