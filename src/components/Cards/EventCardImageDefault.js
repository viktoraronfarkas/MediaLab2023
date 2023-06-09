import React from 'react';
import { Card } from 'react-native-paper';
import { theme } from '../../constants/myTheme';
import cardImageEventDefault from '../../../assets/Images/event-card-default-image.png';

/**
 * This Component represents the default image for the event card.
 */
export default function EventCardImageDefault() {
  return (
    <Card.Cover
      source={cardImageEventDefault}
      resizeMode="contain"
      style={{
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        borderBottomEndRadius: 0,
        borderBottomStartRadius: 0,
        backgroundColor: theme.colors.primary,
      }}
    />
  );
}
