import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 24,
    padding: 10,
    backgroundColor: '#DFDAD3',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonContainer: {
    backgroundColor: '#F34F34',
    borderRadius: 28,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    color: '#FFFFFF',
  },
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

function DialogueAction({ text, isDialog, actions }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, isDialog && styles.dialog]}>{text}</Text>
      <View style={styles.buttonRow}>
        {actions.map((action) => (
          <TouchableOpacity key={action.id} style={styles.buttonContainer} onPress={action.onPress}>
            <Text style={styles.buttonText}>{action.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default DialogueAction;

// How to use it:
// <DialogueAction text="Do you want to delete this item?" isDialog actions={[{ id: 1, text: 'Cancel' }, { id: 2, text: 'Delete'}]} />

