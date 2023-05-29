import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { theme } from '../../constants/myTheme';

const style = StyleSheet.create({
  input: {
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
 *  If it has password included:
 * <InputField label="Enter Password" secureTextEntry value={password} onChangeText={(value) => setPassword(value)} />
 * 
 * 
 * If the Input should not be changed, disable edit:
 *  <InputField
          labelText="LabelText"
          marginLeft={0}
          editable={false}
        />
 */

export default function InputField({
  placeholderText,
  labelText,
  onFocus,
  onBlur,
  value,
  onChangeText,
  padding,
  marginLeft,
  secureTextEntry,
  width = '100%',
  editable = true,
  inputStyle, // leave that inside please! It's for overriding the input-style
}) {
  const dynamicStyles = StyleSheet.create({
    input: {
      padding: padding !== undefined ? padding : 2,
      marginLeft: marginLeft !== undefined ? marginLeft : 20,
      flex: width === '50%' ? 1 : undefined,
      maxWidth: width === '50%' ? '50%' : undefined,
    },
  });
  return (
    <View>
      <TextInput
        placeholder={placeholderText}
        label={labelText}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        onChangeText={onChangeText}
        style={[
          [style.input, dynamicStyles.input, { width }, inputStyle],
          secureTextEntry && { secureTextEntry: true },
        ]}
        underlineColor="transparent"
        theme={{
          colors: {
            primary: theme.colors.neutralsGrey500,
            text: theme.colors.neutralsBlack,
          },
        }}
        secureTextEntry={secureTextEntry}
        editable={editable}
      />
    </View>
  );
}
