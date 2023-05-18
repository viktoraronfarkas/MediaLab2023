import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { styles } from '../constants/myTheme';
import defaultImage from '../../assets/Icons/group-big-default-icon.png';

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginBottom: 8,
  },
});

/**
 * This component is the Circle Icon Container with text below
 * If there is no image source it will use the group-default-icon image
 *  How to use it:
  <GroupIconContainer
   imageSource={groupImage}
   title="My Group"
  />
 */
export default function GroupIconContainer({ imageSource, title, imageStyle }) {
  return (
    <View style={style.container}>
      {imageSource ? (
        <Image style={[style.image, imageStyle]} source={imageSource} />
      ) : (
        <Image style={[style.image, imageStyle]} source={defaultImage} />
      )}
      <Text style={styles.subtitle1}>{title}</Text>
    </View>
  );
}
