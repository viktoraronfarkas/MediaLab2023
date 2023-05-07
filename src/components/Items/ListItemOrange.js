import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Card, IconButton } from 'react-native-paper';
import { theme, styles } from '../../constants/myTheme';

const style = StyleSheet.create({
  cardContainer: {
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    paddingTop: 11,
    paddingBottom: 11,
  },
});
/**
 * This Component represents the List Item Orange containing avatar text, main and sub-titles and a side action image-icon.
 * The subTitle is optional.
 *
 * EXAMPLE:
 *
 * import iconImage from './assets/Icons/arrow-right.png';
 *
 * < ListItemRed mainTitle="Spike Ball" subtitle="Subhead" iconImage={image} />
 */
export default function ListItemOrange({
  mainTitle,
  subtitle,
  iconImage,
  onPress,
}) {
  const listLabel = (title) =>
    // return title.match(/\b\w/g).join('');
    title.split(' ').map((i) => i.charAt(0)); // Inherit case of each letter
  return (
    <TouchableOpacity onPress={onPress}>
      <Card contentStyle={style.cardContainer} elevation={0}>
        <Card.Title
          title={mainTitle}
          titleStyle={[styles.headline3, { color: theme.colors.onPrimary }]}
          subtitle={subtitle}
          subtitleStyle={[styles.subtitle2, { color: theme.colors.onPrimary }]}
          left={(props) => (
            <Avatar.Text
              {...props}
              size={40}
              label={listLabel(mainTitle)}
              style={{ backgroundColor: theme.colors.backgroundWhite }}
            />
          )}
          right={(props) => (
            <IconButton
              {...props}
              size={40}
              icon={iconImage}
              iconColor={theme.colors.onPrimary}
              resizeMode="contain"
            />
          )}
        />
      </Card>
    </TouchableOpacity>
  );
}
