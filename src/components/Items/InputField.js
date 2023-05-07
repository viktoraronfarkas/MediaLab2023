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
    backgroundColor: theme.colors.backgroundSand,
  },
});
/**
 * This Component represents the general input field.
 * The label Text can be adjusted.
 *
 * EXAMPLE:
 *
 * < InputField labelText="Enter Email!" />
 */

export default function InputField({ labelText, value, onChangeText }) {
  return (
    <SafeAreaView>
      <TextInput
        label={labelText}
        value={value}
        onChangeText={onChangeText}
        style={style.input}
        underlineColor="transparent"
        theme={{
          colors: {
            primary: theme.colors.neutralsGrey500,
            text: theme.colors.neutralsBlack,
          },
        }}
      />
    </SafeAreaView>
  );
}
