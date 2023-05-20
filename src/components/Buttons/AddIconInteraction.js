import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Text } from 'react-native';
import { styles } from '../../constants/myTheme';

const style = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    height: 40,
    width: 40,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
});
/**
 * This Component represents a text, a clickable IconImage
 * You can also adjust the styling of the images accordingly (iconStyle )
 *
 * EXAMPLE: <AddIconInteraction text="join me!" icon={iconImage}  />
 * import iconImage from './assets/Icons/plus-icon.png'
 */

export default function AddIconInteraction({ text, icon, iconStyle, onPress }) {
  return (
    <View>
      <View style={style.container}>
        <TouchableOpacity onPress={onPress} style={style.button}>
          <Image
            style={[style.icon, iconStyle]}
            source={icon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.headline3}> {text} </Text>
      </View>
    </View>
  );
}
