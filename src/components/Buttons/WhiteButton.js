import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme, styles } from '../../constants/myTheme';

const style = StyleSheet.create({
  styleButton: {
    alignSelf: 'flex-end', // Override this for position --> 'center'
    backgroundColor: theme.colors.backgroundWhite,
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
 * <WhiteButton text="cancel event"  styleButton={{  alignSelf: 'center', width: '100%' }}  />
 */

export default function WhiteButton({ text, styleButton, onPress }) {
  return (
    <SafeAreaView>
      <TouchableOpacity
        style={[style.styleButton, styleButton]}
        onPress={onPress}
      >
        <Text style={[styles.button, { color: theme.colors.primary }]}>
          {text}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
