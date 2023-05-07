import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme, styles } from '../../constants/myTheme';

const style = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.backgroundCamel,
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: 'auto',
    alignSelf: 'center',
  },
});

/**
 * This represents a small button container.
 * The text is displayed according to the data.
 * It can be used to map all disabled items in the filter
 *
 * Example:
 *
 * <SmallButtonGrey title = filter.items.names
 */
export default function SmallButtonGray({ onPress, title }) {
  return (
    <TouchableOpacity style={style.button} onPress={onPress}>
      <Text
        style={[styles.bodyDefault, { color: theme.colors.neutralsGrey800 }]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
