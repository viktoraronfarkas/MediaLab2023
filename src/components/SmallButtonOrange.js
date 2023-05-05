import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    // The Colors should be dynamic and not static
    button: {
      backgroundColor: '#F34F34',
      borderRadius: 16,
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    title: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      // fontFamily: '', to be added
    },
  });

function SmallButtonOrange({ onPress, title }) {
  return <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
}
  
  export default SmallButtonOrange;
  