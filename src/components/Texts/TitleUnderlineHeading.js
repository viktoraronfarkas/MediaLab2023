import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from '../../constants/myTheme';

const style = StyleSheet.create({
  container: {
    width: '100%',
  },
});

/**
 * This Component represents a main Title and an Image representing as a line, thicker line or curly line etc.
 *
 * import underLineImage from './assets/Images/underLineImage.png';
 *
 * EXAMPLE:
 *
 * <TitleUnderlineHeadingH2 title="Main Group" image={underLineImage} lineStyle={{ height: 10, width: 150 }} />
 */
export default function TitleUnderlineHeading({ title, image, lineStyle }) {
  return (
    <View style={style.container}>
      <Text style={[styles.headline3, { textAlign: 'center' }]}> {title} </Text>
      <View>
        <Image
          style={[style.line, lineStyle]}
          source={image}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}
