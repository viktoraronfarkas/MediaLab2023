import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { theme, styles } from '../../constants/myTheme';

const style = StyleSheet.create({
  styleButton: {
    alignSelf: 'flex-end', // Override this for position --> 'center'
    backgroundColor: theme.colors.neutralsGrey500,
    paddingVertical: 17,
    paddingHorizontal: 33,
    borderRadius: 100,
    width: 'auto', // Override this for --> full width '100%'
    alignItems: 'center',
  },
});

/**
 * This Component represents a button in grey. The Text can be changed.
 * The style and especially the position of the Button can be adjusted and overridden.
 *
 * EXAMPLE (for a FULL WIDTH BUTTON):
 *
 * <GreyButton text="Comment"  styleButton={{  alignSelf: 'center', width: '100%' }}  />
 */

export default function GreyButton({ text, styleButton, onPress }) {
  return (
    <View>
      <TouchableOpacity
        style={[style.styleButton, styleButton]}
        onPress={onPress}
      >
        <Text style={[styles.button, { color: theme.colors.neutralsWhite }]}>
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
