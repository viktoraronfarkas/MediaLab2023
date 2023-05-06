import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#EAEAEA',
    padding: 10,
    marginLeft: 25,
    borderRadius: 8,
    fontFamily: 'Nunito',
    fontSize: 16,
  },
});

/// This Component represents the general input field.
/// The style and especially the position of the Button can be adjusted and overridden
///
/// EXAMPLE:
/// <InputField labelText="Enter Email!"  input={{  alignSelf: 'center', width: '100%' }}  />
export default function InputField({ /* labelText , */ value, onChangeText }) {
  return (
    <SafeAreaView>
      <TextInput
        label="Enter Email"
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        theme={{
          colors: {
            primary: '#F34F34',
            text: '#000000',
          },
        }}
      />
    </SafeAreaView>
  );
}
