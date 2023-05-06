import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    color: '#1F2937',
  },
});

function GroupIconContainer({ imageSource, title }) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={imageSource} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

export default GroupIconContainer;

// How to use it:
// <GroupIconContainer
//     imageSource={foodIcon} 
//     title="My Group"
// />
