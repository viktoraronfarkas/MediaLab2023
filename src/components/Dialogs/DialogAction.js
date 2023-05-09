import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { theme, styles } from '../../constants/myTheme';

const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 30,
    borderRadius: 12,
    backgroundColor: theme.colors.backgroundCamel,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonContainer: {
    borderRadius: 28,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginHorizontal: 8,
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
  },

  dialog: {
    backgroundColor: theme.colors.backgroundCamel,
    borderRadius: 8,
    padding: 12,
  },
});

/**
 * This Component represents a dialog information with action buttons.
 * The buttons can be dynamically added or removed.
 * 
 * How to use it:
 * 
 * <DialogAction
    text="Do you want to delete this item? "
    isDialog
    actions={[
     { id: 1, text: 'Cancel' },
     { id: 2, text: 'Delete' },
     ]}
    />
 */
export default function DialogAction({ text, isDialog, actions }) {
  return (
    <View style={style.container}>
      <Text
        style={[
          styles.subtitle1,
          { textAlign: 'center' },
          isDialog && style.dialog,
        ]}
      >
        {text}
      </Text>
      <View style={style.buttonRow}>
        {actions.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={style.buttonContainer}
            onPress={action.onPress}
          >
            <Text
              style={[styles.button, { color: theme.colors.neutralsWhite }]}
            >
              {action.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
