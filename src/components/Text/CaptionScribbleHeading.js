import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';

// TODO Splitted text needs to be aligned to the first line

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  containerSubHeading: {
    flexDirection: 'row',
  },
  subHeading: {
    fontFamily: 'Nunito',
    fontSize: 17,
    fontWeight: 700,
    lineHeight: 32,
    color: '#F34F34',
  },
  scribble: {
    height: 20,
    width: 20,
  },
  containerTitle: {
    flexDirection: 'row',
  },
  arrow: {
    height: 50,
    width: 90,
  },
  textWrap: {
    flexWrap: 'wrap',
  },
  title: {
    fontFamily: 'Basic Sans',
    fontSize: 32,
    fontWeight: 700,
    lineHeight: 40,
    width: 200,
  },
  underline: {
    position: 'absolute',
    top: 85,
    left: 60,
    height: 10,
    width: 110,
  },
});

/// This Component represents a sub Heading with a main Title below
/// Also different images representing as scribbles and lines
/// You can also adjust the styling of the images accordingly
///
/// EXAMPLE: <CaptionScribbleHeading  subHeading="For you"  title="Your latest interaction on point" scribbleSubHeadingImage={image} lineStyle={{ height: 50, width: 50 }} />
/// import image from './path/Images/image'
export default function CaptionScribbleHeading({
  subHeading,
  scribbleSubHeadingImage,
  scribbleStyle,
  title,
  arrowImage,
  arrowStyle,
  underlineImage,
  underlineStyle,
}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerSubHeading}>
        <Text style={styles.subHeading}> {subHeading} </Text>
        <Image
          style={[styles.scribble, scribbleStyle]}
          source={scribbleSubHeadingImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.containerTitle}>
        <View style={styles.textWrap}>
          <Text style={styles.title}> {title} </Text>
        </View>
        <Image
          style={[styles.arrow, arrowStyle]}
          source={arrowImage}
          resizeMode="contain"
        />
      </View>
      <Image
        style={[styles.underline, underlineStyle]}
        source={underlineImage}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
}
