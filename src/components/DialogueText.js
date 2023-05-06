import React from 'react';
import { Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    color: '#1F2937',
  },
  dialog: {
    backgroundColor: '#DFDAD3',
    borderRadius: 8,
    padding: 12,
  },
});

function DialogueText({ text, isDialog }) {
  return (
    <Text style={[styles.text, isDialog && styles.dialog]}>{text}</Text>
  );
}

export default DialogueText;

// How to use it:
// Without color:
// <DialogueText text="Hello, this is a dialogue text!" />
// With BackgroundColor:
// <DialogueText text="This is a dialog text too." isDialog={1} />
