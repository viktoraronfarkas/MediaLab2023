import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from '../../constants/myTheme';

const style = StyleSheet.create({
  container: {
    width: '100%',
  },
  containerText: {
    flexDirection: 'row',
  },
  iconStyle: {
    height: 40,
    width: 40,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },

  underlineStyle: {
    position: 'absolute',
    top: 60,
    height: 40,
    width: 350,
  },
});
/**
 * This Component represents a text, a clickable IconImage and an Image representing underlines, arrows etc.
 * You can also adjust the styling of the images accordingly (iconStyle, underlineStyle )
 *
 * EXAMPLE:
 *
 * import icon from './assets/Icons/plus-icon.png';
 *
 * import underlineArrowImage from './assets/Images/underlineArrowImage.png';
 *
 * <TextIconInteraction text="add a new post event"  icon={icon} underlineImage={underlineArrowImage} underlineStyle={{ top: 60, height: 40, width: 340 }} />
 */

export default function TextIconInteraction({
  text,
  icon,
  iconStyle,
  underlineImage,
  underlineStyle,
  onPress,
}) {
  return (
    <View style={style.container}>
      <View style={style.containerText}>
        <Text style={[styles.headline3, { top: 10 }]}> {text} </Text>
        <TouchableOpacity onPress={onPress} style={style.button}>
          <Image
            style={[style.iconStyle, iconStyle]}
            source={icon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <Image
        style={[style.underlineStyle, underlineStyle]}
        source={underlineImage}
        resizeMode="contain"
      />
    </View>
  );
}
