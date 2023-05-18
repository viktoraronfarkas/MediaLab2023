import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { theme, styles } from '../../constants/myTheme';

const style = StyleSheet.create({
  container: {
    width: '100%',
  },
  containerSubHeading: {
    flexDirection: 'row',
  },
  scribble: {
    height: 20,
    width: 20,
  },
  containerTitle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  arrow: {
    height: 50,
    width: 90,
    transform: [{ scaleX: -1 }],
  },
  underline: {
    position: 'absolute',
    top: 71,
    right: 15,
    height: 10,
    width: 130,
  },
});

/**
 * This Component represents a sub Heading with a main Title below
 * Also different images representing as scribbles and lines
 * You can also adjust the styling of the images accordingly
 * If the arrowImage is TOO FAR from the title-text --> adjust the width in the headline1 according to the text.
 *
 * EXAMPLE:
 *
 * import scribble from './assets/Images/heartRightImage.png'; 
 * import underline from './assets/Images/underLineImage.png';
 * import arrow from './assets/Images/arrowImage.png';
 *
 *    <CaptionScribbleHeadingMirror
          title="Sub Groups"
          headlineStyle={{ width: 160 }}
          underlineImage={underline}
          arrowImage={arrow}
        />
 */

export default function CaptionScribbleHeading({
  subHeading,
  scribbleSubHeadingImage,
  containerSubHeadingStyle,
  scribbleStyle,
  title,
  headlineStyle,
  arrowImage,
  arrowStyle,
  underlineImage,
  underlineStyle,
}) {
  return (
    <SafeAreaView style={style.container}>
      <View style={[style.containerSubHeading, containerSubHeadingStyle]}>
        <Text style={[styles.captionBold, { color: theme.colors.primary }]}>
          {subHeading}
        </Text>
        <Image
          style={[style.scribble, scribbleStyle]}
          source={scribbleSubHeadingImage}
          resizeMode="contain"
        />
      </View>
      <Image
        style={[style.underline, underlineStyle]}
        source={underlineImage}
        resizeMode="contain"
      />

      <View style={style.containerTitle}>
        <Image
          style={[style.arrow, arrowStyle]}
          source={arrowImage}
          resizeMode="contain"
        />
        <Text
          style={[
            styles.headline1,
            { width: 160, textAlign: 'right' },
            headlineStyle,
          ]}
        >
          {title}
        </Text>
      </View>
    </SafeAreaView>
  );
}
