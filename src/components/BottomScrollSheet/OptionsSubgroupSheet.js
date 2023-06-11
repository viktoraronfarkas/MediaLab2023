import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { styles } from '../../constants/myTheme';

const style = StyleSheet.create({
  text: {
    paddingVertical: 10,
  },
});

export default function OptionsLeaveGroupSheet({
  onLeave,
  onDelete,
  onCancel,
  leaveText,
  cancelText,
  deleteText,
  sheetTitle,
  deleteEnabled,
}) {
  return (
    <View>
      <Text style={(styles.textLink, { paddingTop: 15, paddingBottom: 20 })}>
        {sheetTitle}
      </Text>
      <TouchableOpacity onPress={onLeave} style={style.text}>
        <Text style={styles.headline2}>{leaveText}</Text>
      </TouchableOpacity>
      {deleteEnabled === true ? (
        <TouchableOpacity onPress={onDelete} style={style.text}>
          <Text style={styles.headline2}>{deleteText}</Text>
        </TouchableOpacity>
      ) : (
        ''
      )}
      <TouchableOpacity onPress={onCancel} style={style.text}>
        <Text style={styles.headline2}>{cancelText}</Text>
      </TouchableOpacity>
    </View>
  );
}
