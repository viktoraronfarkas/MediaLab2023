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
  },
  arrow: {
    height: 50,
    width: 90,
  },
  textWrap: {
    flexWrap: 'wrap',
  },
  underline: {
    position: 'absolute',
    top: 85,
    left: 60,
    height: 10,
    width: 110,
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
 *    <CaptionScribbleHeading
          subHeading="For you"
          title="Your latest interaction"
          scribbleSubHeadingImage={scribble}
          underlineImage={underline}
          arrowImage={arrow}
          lineStyle={{ height: 50, width: 50 }}
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

      <View style={style.containerTitle}>
        <Text
          style={[
            styles.headline1,
            { width: 160, textAlign: 'left' },
            headlineStyle,
          ]}
        >
          {title}
        </Text>
        <Image
          style={[style.arrow, arrowStyle]}
          source={arrowImage}
          resizeMode="contain"
        />
      </View>
      <Image
        style={[style.underline, underlineStyle]}
        source={underlineImage}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
}
