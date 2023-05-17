import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { theme, styles } from '../../constants/myTheme';

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'flex-start',
    paddingVertical: 15,
  },
});
/**
 *
 * @param {*} param0
 * @returns
 */
export default function OrangeSubtitleBodyText({ title, bodyText }) {
  return (
    <View style={style.container}>
      <Text style={[styles.subtitle2, { color: theme.colors.primary }]}>
        {title}
      </Text>
      <Text style={styles.bodyDefault}>{bodyText}</Text>
    </View>
  );
}
