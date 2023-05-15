import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Badge } from 'react-native-paper';
import { theme, styles } from '../../constants/myTheme';
import EventCardImageDefault from './EventCardImageDefault';

const style = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 5,
    backgroundColor: theme.colors.backgroundWhite,
  },

  badge: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: theme.colors.backgroundWhite,
    color: theme.colors.neutralsBlack,
  },
});

/** This Component represents the event card.
 *
 * EXAMPLE:
 * <EventCard joiningNumber={event.users.joined} title={event.title} subTitle={event.subTitle} cardImage={subgroup.event.image} />
 */
export default function EventCard({
  joiningNumber,
  title,
  subTitle,
  cardImage,
}) {
  return (
    <Card elevation={0} style={style.container}>
      {cardImage ? (
        <Card.Cover
          source={cardImage}
          resizeMode="cover"
          style={{
            borderTopStartRadius: 10,
            borderTopEndRadius: 10,
            borderBottomEndRadius: 0,
            borderBottomStartRadius: 0,
          }}
        />
      ) : (
        // if there is no cardImage take a default image
        <EventCardImageDefault />
      )}
      <Badge size={25} style={style.badge}>
        Joining: {joiningNumber}
      </Badge>

      <Card.Title
        titleStyle={styles.subtitle1}
        subtitleStyle={styles.caption}
        title={title}
        subtitle={subTitle}
      />
    </Card>
  );
}
