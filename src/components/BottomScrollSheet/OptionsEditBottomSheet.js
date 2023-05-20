import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { styles } from '../../constants/myTheme';

const style = StyleSheet.create({
  text: {
    paddingVertical: 10,
  },
});

export default function OptionsEditBottomSheet({ onEdit, onDeleteEvent }) {
  return (
    <View>
      <Text style={(styles.textLink, { paddingTop: 15, paddingBottom: 20 })}>
        More Options:
      </Text>
      <TouchableOpacity onPress={onEdit} style={style.text}>
        <Text style={styles.headline2}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDeleteEvent} style={style.text}>
        <Text style={styles.headline2}>Delete Event</Text>
      </TouchableOpacity>
    </View>
  );
}
