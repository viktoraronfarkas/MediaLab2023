import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const ClickableText = ({ onPress, text }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

export default ClickableText;