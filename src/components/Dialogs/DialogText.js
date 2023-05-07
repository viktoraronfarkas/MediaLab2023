import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { theme, styles } from '../../constants/myTheme';

const style = StyleSheet.create({
  dialog: {
    borderRadius: 12,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: theme.colors.backgroundCamel,
  },
});

/**
 * How to use it:
 *  With BackgroundColor:
 *
 * < DialogText text="This is a dialog text too." isDialog={1} />
 *
 *
 * Without color:
 *
 * < DialogText text="Hello, this is a dialogue text!" />
 */
export default function DialogText({ text, isDialog }) {
  return (
    <View style={[isDialog && style.dialog]}>
      <Text
        style={[
          styles.subtitle1,
          { textAlign: 'center' },
          isDialog && style.dialog,
        ]}
      >
        {text}
      </Text>
    </View>
  );
}
