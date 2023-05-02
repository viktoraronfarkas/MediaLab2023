import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  containerText: {
    flexDirection: 'row',
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
  text: {
    top: 10,
    fontFamily: 'Basic Sans',
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 32,
  },

  underline: {
    position: 'absolute',
    top: 60,
    height: 40,
    width: 350,
  },
});

/// This Component represents a text, a clickable IconImage and an Image representing underlines, arrows etc.
/// You can also adjust the styling of the images accordingly (iconStyle, underlineStyle )
///
/// EXAMPLE: <CaptionScribbleHeading text="add a new post event" image={underLineImage} underlineStyle={{ top:60 height: 40, width: 350 }} />
/// import underLineImage from './path/Images/underLineImage'
export default function AddIconInteraction({
  text,
  icon,
  iconStyle,
  underlineImage,
  underlineStyle,
  onPress,
}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerText}>
        <Text style={styles.text}> {text} </Text>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Image
            style={[styles.icon, iconStyle]}
            source={icon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <Image
        style={[styles.underline, underlineStyle]}
        source={underlineImage}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
}
