import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from '../../constants/myTheme';

const style = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
});

/**
 * This Component displays a big text in color red.
 * It contains two big text inputs (above and below).
 * And one smaller size text input representing a note.
 * 
 * EXAMPLE:
 * 
 * <OrangeMessageBig
      textAbove={'Error'}
      textBelow={'Message'}
      note={'Please try again.'}
    >
 */

export default function OrangeMessageBig({ textAbove, textBelow, note }) {
  return (
    <View style={style.container}>
      <Text style={[styles.headlineXL, { lineHeight: 70 }]}> {textAbove} </Text>
      <Text style={[styles.headlineXL, { lineHeight: 70 }]}> {textBelow} </Text>
      <Text style={[styles.headlineXL, { lineHeight: 70, fontSize: 18 }]}>
        {note}
      </Text>
    </View>
  );
}
