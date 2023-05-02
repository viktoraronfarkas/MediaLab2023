import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-end', // Override this for position
    backgroundColor: '#F34F34',
    paddingVertical: 17,
    paddingHorizontal: 33,
    borderRadius: 100,
    width: 'auto', // Override this for auto or full width
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 22,
    fontFamily: 'Nunito',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/// This Component represents a button in red. The Text can be changed.
/// The style and especially the position of the Button can be adjusted and overridden
///
/// EXAMPLE (full width button):
/// <RedButton text="join event!"  styleButton={{  alignSelf: 'center', width: '100%' }}  />
export default function RedButton({ text, styleButton, onPress }) {
  return (
    <SafeAreaView>
      <TouchableOpacity style={[styles.button, styleButton]} onPress={onPress}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
