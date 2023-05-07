import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { styles } from '../../constants/myTheme';

const style = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
  line: {
    position: 'absolute',
    top: -20,
    left: 0,
  },
});

/**
 * This Component represents a main Title and an Image representing a circle in front of the text.
 * The lineStyle can be adjusted (like example).
 *
 * EXAMPLE:
 *
 * import circleLineImage from './assets/Images/circleLineImage.png'
 *
 * <TitleCircleHeadingH2 title="Subgroups" image={circleLineImage} lineStyle={{ height: 80, width: 160 }} />
 */

export default function TitleCircleHeadingH2({ title, image, lineStyle }) {
  return (
    <SafeAreaView style={style.container}>
      <View>
        <Text style={[styles.headline3, { paddingLeft: 13, paddingTop: 3 }]}>
          {title}
        </Text>
        <Image
          style={[style.line, lineStyle]}
          source={image}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
}
