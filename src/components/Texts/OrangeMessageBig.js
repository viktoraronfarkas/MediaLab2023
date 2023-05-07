import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { theme, styles } from '../../constants/myTheme';

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
 * <RedMessageBig
      textAbove={'Error'}
      textBelow={'Message'}
      note={'Please try again.'}
    >
 */

export default function OrangeMessageBig({ textAbove, textBelow, note }) {
  return (
    <SafeAreaView style={style.container}>
      <Text style={[styles.headlineXL, { lineHeight: 70 }]}> {textAbove} </Text>
      <Text style={[styles.headlineXL, { lineHeight: 70 }]}> {textBelow} </Text>
      <Text style={[styles.headlineXL, { lineHeight: 70, fontSize: 18 }]}>
        {' '}
        {note}{' '}
      </Text>
    </SafeAreaView>
  );
}
