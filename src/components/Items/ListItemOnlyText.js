import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import { theme, styles } from '../../constants/myTheme';

const style = StyleSheet.create({
  cardContainer: {
    backgroundColor: theme.colors.neutralsWhite,
    borderRadius: 12,
    paddingVertical: 11,
  },
  mainTitle: {
    color: theme.colors.primary,
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
    <TouchableOpacity onPress={onPress}>
      <Card
        contentStyle={[style.cardContainer, cardContainerStyle]}
        elevation={0}
      >
        <Card.Title
          title={title}
          titleStyle={styles.headline3}
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
    </TouchableOpacity>
  );
}
