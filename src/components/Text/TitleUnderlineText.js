import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    fontFamily: 'Basic Sans',
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 32,
  },
});

/// This Component represents a main Title and an Image representing as a line, thicker line or curly line etc.
///
/// EXAMPLE: <TitleUnderlineText title="Main Group" image={underLineImage} lineStyle={{ height: 10, width: 150 }} />
export default function TitleUnderlineText({ title, image, lineStyle }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}> {title} </Text>
      <View>
        <Image
          style={[styles.line, lineStyle]}
          source={image}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
}
