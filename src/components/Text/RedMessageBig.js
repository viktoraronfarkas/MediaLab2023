import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  text: {
    fontFamily: 'Basic Sans',
    fontSize: 64,
    fontWeight: 700,
    lineHeight: 70,
    color: '#F34F34',
  },
});

/// This Component display a big text in color red
export default function RedMessageBig({ textAbove, textBelow }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}> {textAbove} </Text>
      <Text style={styles.text}> {textBelow} </Text>
    </SafeAreaView>
  );
}
