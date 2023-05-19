import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from '../../constants/myTheme';

import UserProfileScreen from './UserProfile/UserProfileScreen';
import PersonalDataScreen from './AccountDetails/personalData/PersonalDataScreen';
import InteractedPostsScreen from './AccountDetails/interactedPosts/InteractedPostsScreen';
import JoinedEventsScreen from './AccountDetails/joinedEvents/JoinedEventScreen';
import JoinedGroupsScreen from './AccountDetails/joinedGroups/JoinedGroupsScreen';
import YourPostsEventsScreen from './AccountDetails/yourPostsAndEvents/YourPostsEventsScreen';
import HelpScreen from './AccountDetails/help/HelpScreen';
import AboutUsScreen from './AccountDetails/aboutUs/AboutUsScreen';
import DataSecurity from '../DataSecurity';
import CommunityGuidelines from '../CommunityGuidelines';
import BackButtonNavigationContainer from '../../components/Buttons/BackButtonNavigationContainer';

export default function UserProfileNavigation() {
  const Stack = createStackNavigator();

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
        }}
      >
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
