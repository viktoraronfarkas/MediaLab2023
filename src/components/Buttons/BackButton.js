import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { styles } from '../../constants/myTheme';
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
        gap: '2%',
        left: '2%',
      }}
    >
      <TouchableOpacity onPress={onPress}>
        <Image
          style={{ width: 40, height: 40 }}
          source={require('../../../assets/Icons/back.png')}
        />
      </TouchableOpacity>
      <Text style={styles.captionBold}>{text}</Text>
    </View>
  );
}

export default BackButton;
