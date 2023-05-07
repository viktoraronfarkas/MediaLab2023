import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '../constants/myTheme';

const style = StyleSheet.create({
  clickableText: {
    padding: 30,
    alignSelf: 'center',
  },
});

export default function ClickableText({ onPress, text, clickableTextStyle }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[style.clickableText, clickableTextStyle]}
    >
      <Text style={[styles.textLink, { textDecorationLine: 'underline' }]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
