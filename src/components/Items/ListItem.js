import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Avatar, Card, IconButton } from 'react-native-paper';
import { theme, styles } from '../../constants/myTheme';

/**
 * This Component represents the List Item containing avatar image, main and sub titles and a side action image-icon.
 *
 * EXAMPLE:
 *
 * import iconImage from './assets/Icons/arrow-right.png';
 *
 * < ListItem mainTitle="Spike Ball" subtitle="Spike Ball" iconImage={iconImage} />
 */

const listLabel = (title) => title.split(' ').map((i) => i.charAt(0)); // Inherit case of each letter

export default function ListItem({
  cardContainerStyle,
  mainTitle,
  subtitle,
  iconImage,
  onPress,
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card
        style={[
          {
            backgroundColor: theme.colors.neutralsWhite,
            marginVertical: 10,
            paddingVertical: 10,
          },
          cardContainerStyle,
        ]}
        elevation={0}
      >
        <Card.Title
          title={mainTitle}
          titleStyle={styles.headline3}
          subtitle={subtitle}
          subtitleStyle={styles.subtitle2}
          left={(props) => (
            <Avatar.Text
              {...props}
              style={{ backgroundColor: theme.colors.primary }}
              size={40}
              label={listLabel(mainTitle)}
            />
          )}
          right={(props) => (
            <IconButton
              {...props}
              size={40}
              icon={iconImage}
              resizeMode="contain"
            />
          )}
        />
      </Card>
    </TouchableOpacity>
  );
}
