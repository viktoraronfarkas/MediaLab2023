import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from '../../constants/myTheme';
import { BackSvg } from '../svgs';

/**
 * This Component represents a text, a clickable IconImage
 * You adjust the text and the onPress function
 *
 * EXAMPLE: <BackButton text="join me!" onPress={onPress}  />
 */
function BackButton({ text, onPress }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <TouchableOpacity onPress={onPress}>
        <BackSvg color="#000" width={35} height={35} />
      </TouchableOpacity>
      <Text style={[styles.captionBold, { left: '2%' }]}>{text}</Text>
    </View>
  );
}

export default BackButton;
