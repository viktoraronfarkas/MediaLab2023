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
  const profileStack = createStackNavigator();

  return (
    <NavigationContainer>
      <profileStack.Navigator
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
        <profileStack.Screen
          name="UserProfile"
          component={UserProfileScreen}
          options={{ title: '', headerShown: false }}
        />
        <profileStack.Screen
          name="PersonalData"
          component={PersonalDataScreen}
          options={{ title: '' }}
        />
        <profileStack.Screen
          name="YourPostsEvents"
          component={YourPostsEventsScreen}
          options={{ title: '' }}
        />
        <profileStack.Screen
          name="InteractedPosts"
          component={InteractedPostsScreen}
          options={{ title: '' }}
        />
        <profileStack.Screen
          name="JoinedEvents"
          component={JoinedEventsScreen}
          options={{ title: '' }}
        />
        <profileStack.Screen
          name="JoinedGroups"
          component={JoinedGroupsScreen}
          options={{ title: '' }}
        />
        <profileStack.Screen
          name="help"
          component={HelpScreen}
          options={{ title: '' }}
        />
        <profileStack.Screen
          name="aboutUs"
          component={AboutUsScreen}
          options={{ title: '' }}
        />
        {/*  <Stack.Screen
          name="quickTour"
          component={QuickTour}
         
        /> */}
        <profileStack.Screen
          name="communityGuidelines"
          component={CommunityGuidelines}
          options={{ title: '' }}
        />
        <profileStack.Screen
          name="dataSecurity"
          component={DataSecurity}
          options={{ title: '' }}
        />
      </profileStack.Navigator>
    </NavigationContainer>
  );
}
