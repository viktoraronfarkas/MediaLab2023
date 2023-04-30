import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import ListItem from './GroupCard';

const FeedRoute = () => <ListItem />;

const SearchRoute = () => <Text>Search</Text>;

const InteractionRoute = () => <Text>Interaction</Text>;

const ProfileRoute = () => <Text>Profile</Text>;

const BottomNav = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
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
};

export default BottomNav;
