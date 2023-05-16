import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme, styles } from '../../constants/myTheme';

const style = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 16,
    paddingHorizontal: 16,
    width: 'auto',
    alignSelf: 'center',
  },
});

/**
 * This represents a small button container.
 * The text is displayed according to the data.
 * It can be used to map all enabled items in the filter
 *
 * Example:
 *
 * <SmallButtonOrange title = filter.items.names
 */
export default function SmallButtonOrange({
  onPress,
  title,
  paddingVertical = 8,
}) {
  return (
    <TouchableOpacity
      style={[style.button, { paddingVertical }]}
      onPress={onPress}
    >
      <Text style={[styles.bodyDefault, { color: theme.colors.neutralsWhite }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
