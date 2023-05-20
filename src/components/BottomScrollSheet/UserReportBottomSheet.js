import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { styles } from '../../constants/myTheme';

const style = StyleSheet.create({
  text: {
    paddingVertical: 10,
  },
});

export default function UserReportBottomSheet({
  onHateSpeech,
  onSpam,
  onInappropriateContent,
  onOther,
  onNeverMind,
}) {
  return (
    <View>
      <Text style={(styles.textLink, { paddingTop: 15, paddingBottom: 20 })}>
        Why do you want to report the user?
      </Text>
      <TouchableOpacity onPress={onHateSpeech} style={style.text}>
        <Text style={styles.headline2}>Hate Speech</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onSpam} style={style.text}>
        <Text style={styles.headline2}>Spam</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onInappropriateContent} style={style.text}>
        <Text style={styles.headline2}>Inappropriate Content</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onOther} style={style.text}>
        <Text style={styles.headline2}>Other</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onNeverMind} style={style.text}>
        <Text style={styles.headline2}>Never Mind...</Text>
      </TouchableOpacity>
    </View>
  );
}
