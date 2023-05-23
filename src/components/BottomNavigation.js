import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import HomeContent from '../views/Home';
import UserProfileView from '../views/UserProfile/UserProfile/UserProfileScreen';
import Latest from '../views/Latest';
import SearchScreen from '../views/SearchScreen';

function FeedRoute() {
  return <HomeContent />;
}

function SearchRoute() {
  return <SearchScreen />;
}

function InteractionRoute() {
  return <Latest />;
}

function ProfileRoute() {
  return <UserProfileView />;
}

function BottomNav({
  HomeSvgFocused,
  HomeSvgUnfocused,
  SearchSvgFocused,
  SearchSvgUnfocused,
  MessageSvgFocused,
  MessageSvgUnfocused,
  ProfileSvgFocused,
  ProfileSvgUnfocused,
}) {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: 'feed',
      title: 'Feed',
      focusedIcon: () => HomeSvgFocused,
      unfocusedIcon: () => HomeSvgUnfocused,
    },
    {
      key: 'search',
      title: 'Search',
      focusedIcon: () => SearchSvgFocused,
      unfocusedIcon: () => SearchSvgUnfocused,
    },
    {
      key: 'interaction',
      title: 'Interaction',
      focusedIcon: () => MessageSvgFocused,
      unfocusedIcon: () => MessageSvgUnfocused,
    },
    {
      key: 'profile',
      title: 'Profile',
      focusedIcon: () => ProfileSvgFocused,
      unfocusedIcon: () => ProfileSvgUnfocused,
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    feed: FeedRoute,
    search: SearchRoute,
    interaction: InteractionRoute,
    profile: ProfileRoute,
  });

  return (
    <BottomNavigation
      theme={{
        colors: {
          secondaryContainer: 'transparent',
        },
      }}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      activeColor="#F34F34"
      inactiveColor="#000"
      barStyle={{ backgroundColor: '#F5F1EC' }}
    />
  );
}

export default BottomNav;
