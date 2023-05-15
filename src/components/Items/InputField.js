import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../constants/myTheme';

const style = StyleSheet.create({
  input: {
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    textDecorationColor: 'none',
    fontFamily: theme.fonts.textLink,
    backgroundColor: theme.colors.backgroundWhite,
  },
  secureInput: {
    // Add this style when secureTextEntry is true
    secureTextEntry: true,
  },
});
/**
 * This Component represents the general input field.
 * The label Text can be adjusted.
 *
 * EXAMPLE:
 *
 *  <InputField
        labelText="Enter Email"
        value={email}
        onChangeText={(value) => setEmail(value)}
      />
 * 
 * <InputField label="Enter Password" secureTextEntry value={password} onChangeText={(value) => setPassword(value)} />
 */
export default function InputField({
  labelText,
  value,
  onChangeText,
  secureTextEntry,
}) {
  return (
    <SafeAreaView>
      <TextInput
        label={labelText}
        value={value}
        onChangeText={onChangeText}
        style={[style.input, secureTextEntry && { secureTextEntry: true }]}
        underlineColor="transparent"
        theme={{
          colors: {
            primary: theme.colors.neutralsGrey500,
            text: theme.colors.neutralsBlack,
          },
        }}
        secureTextEntry={secureTextEntry}
      />
    </SafeAreaView>
  );
}
