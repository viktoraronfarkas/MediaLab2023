import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme, styles } from '../../constants/myTheme';

const style = StyleSheet.create({
  styleButton: {
    alignSelf: 'flex-end', // Override this for position --> 'center'
    paddingVertical: 17,
    paddingHorizontal: 33,
    borderRadius: 100,
    width: 'auto', // Override this for --> full width '100%'
    alignItems: 'center',
  },
});

/**
 * This Component represents a button in red. The Text can be changed.
 * The style and especially the position of the Button can be adjusted and overridden (look at example)
 *
 * EXAMPLE (for a FULL WIDTH BUTTON):
 *
 * <OrangeButton text="join event!"  styleButton={{  alignSelf: 'center', width: '100%' }}  />
 */

export default function OrangeButton({
  text,
  styleButton,
  onPress,
  buttonBackgroundColor = theme.colors.primary,
  disable,
}) {
  return (
    <View>
      <TouchableOpacity
        style={[
          style.styleButton,
          styleButton,
          { backgroundColor: buttonBackgroundColor },
        ]}
        onPress={onPress}
        disabled={disable}
      >
        <Text style={[styles.button, { color: theme.colors.neutralsWhite }]}>
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
