import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Card, IconButton } from 'react-native-paper';

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#F34F34',
    borderRadius: 12,
    paddingTop: 11,
    paddingBottom: 11,
  },
  mainTitle: {
    color: '#FFFFFF',
    fontFamily: 'Basic Sans',
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 32,
  },
  subTitle: {
    top: 7,
    color: '#FFFFFF',
    fontFamily: 'Basic Sans',
    fontSize: 18,
    fontWeight: 600,
    lineHeight: 21,
  },
});

/// This Component represents the List Item Red containing avatar text, main and sub titles and a side action image-icon
///
/// EXAMPLE: <ListItemRed mainTitle="Spike Ball" subtitle="Subhead" iconImage={image} />
/// import iconImage from './path/Images/iconImage'
export default function ListItemRed({
  mainTitle,
  subtitle,
  iconImage,
  onPress,
}) {
  const listLabel = (title) =>
    // return title.match(/\b\w/g).join('');
    title.split(' ').map((i) => i.charAt(0)); // Inherit case of each letter
  return (
    <Card contentStyle={styles.cardContainer} elevation={0}>
      <Card.Title
        title={mainTitle}
        titleStyle={styles.mainTitle}
        subtitle={subtitle}
        subtitleStyle={styles.subTitle}
        left={(props) => (
          <Avatar.Text
            {...props}
            size={40}
            label={listLabel(mainTitle)}
            style={{ backgroundColor: 'white' }}
          />
        )}
        right={(props) => (
          <IconButton
            {...props}
            size={40}
            icon={iconImage}
            iconColor="#FFFFFF"
            onPress={onPress}
            resizeMode="contain"
          />
        )}
      />
    </Card>
  );
}
