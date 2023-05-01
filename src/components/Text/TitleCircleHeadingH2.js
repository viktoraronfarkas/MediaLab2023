import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
  title: {
    fontFamily: 'Basic Sans',
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 32,
    paddingLeft: 7,
    paddingTop: 5,
  },
  line: {
    position: 'absolute',
    top: -20,
    left: 0,
  },
});

/// This Component represents a main Title and an Image representing a circle in front of the text
///
/// EXAMPLE: <TitleCircleHeadingH2 title="Subgroups" image={circleLineImage} lineStyle={{ height: 80, width: 160 }} />
/// import circleLineImage from './path/Images/circleLineImage'
export default function TitleCircleHeadingH2({ title, image, lineStyle }) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}> {title} </Text>
        <Image
          style={[styles.line, lineStyle]}
          source={image}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
}
