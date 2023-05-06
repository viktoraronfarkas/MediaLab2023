import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

function ClickableText({ onPress, text }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
}

export default ClickableText;