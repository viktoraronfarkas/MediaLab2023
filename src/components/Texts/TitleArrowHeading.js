import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { styles } from '../../constants/myTheme';

const style = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
  },
});

/**
 * This Component represents a main Title and an Image representing as a line, arrow next to the title.
 *
 * EXAMPLE:
 *
 * import arrowImage from './assets/Images/arrowImage.png';
 *
 *  <TitleArrowHeading
      title="Computer Graphics"
      arrowImage={arrowImage}
      arrowStyle={{ height: 70, width: 100 }}
    />
 */
export default function TitleArrowHeading({ title, arrowImage, arrowStyle }) {
  return (
    <SafeAreaView style={style.container}>
      <Text style={styles.headline3}> {title} </Text>
      <View>
        <Image
          style={[style.line, arrowStyle]}
          source={arrowImage}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
}
