import React, { useState } from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import HomeContent from '../views/Home';

function FeedRoute() {
  return <HomeContent />;
}

function SearchRoute() {
  return <Text>Search</Text>;
}

function InteractionRoute() {
  return <Text>Interaction</Text>;
}

function ProfileRoute() {
  return <Text>Profile</Text>;
}

function BottomNav() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: 'feed',
      title: 'Feed',
      focusedIcon: 'home',
      unfocusedIcon: 'home-outline',
    },
    { key: 'search', title: 'Search', focusedIcon: 'magnify' },
    { key: 'interaction', title: 'Interaction', focusedIcon: 'chat' },
    {
      key: 'profile',
      title: 'Profile',
      focusedIcon: 'account',
      unfocusedIcon: 'account-outline',
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
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}

export default BottomNav;
