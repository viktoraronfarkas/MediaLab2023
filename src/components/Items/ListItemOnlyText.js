import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Card, IconButton } from 'react-native-paper';

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingTop: 11,
    paddingBottom: 11,
  },
  mainTitle: {
    fontFamily: 'Basic Sans',
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 32,
  },
});

/// This Component represents the List Item containing only text and icon-image.
///
/// EXAMPLE USE Transparent Background:
/// <ListItemOnlyText title="personal data" iconImage={image}  cardStyle={{ backgroundColor: '#FFFFFF00' }} />
/// import iconImage from './src/components/Icons/arrow-right.png';
export default function ListItemOnlyText({
  cardContainerStyle,
  title,
  iconImage,
  onPress,
}) {
  return (
    <Card
      contentStyle={[styles.cardContainer, cardContainerStyle]}
      elevation={0}
    >
      <Card.Title
        title={title}
        titleStyle={styles.mainTitle}
        right={(props) => (
          <IconButton
            {...props}
            size={40}
            icon={iconImage}
            onPress={onPress}
            resizeMode="contain"
          />
        )}
      />
    </Card>
  );
}
