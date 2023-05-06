import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    button: {
    // The Colors should be dynamic and not static
      backgroundColor: '#DFDAD3',
      borderRadius: 16,
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    title: {
      color: '#626262',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    // fontFamily: '', to be added
    },
  });
  

function SmallButtonGray({ onPress, title }) {
  return <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
}
  

  export default SmallButtonGray;