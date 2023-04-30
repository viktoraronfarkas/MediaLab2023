import * as React from 'react';
import { List, Avatar, Card, IconButton } from 'react-native-paper';

const ListItem = () => {
  const listItemTitle = 'Spike Ball';
  const listLabel = (title) => {
    //return title.match(/\b\w/g).join('');
    return title.split(' ').map((i) => i.charAt(0)); //Inherit case of each letter
  };
  return (
    <Card.Title
      title={listItemTitle}
      subtitle="Card Subtitle"
      left={(props) => (
        <Avatar.Text {...props} size={35} label={listLabel(listItemTitle)} />
      )}
      right={(props) => (
        <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
      )}
    />
  );
};

export default ListItem;
