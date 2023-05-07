import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
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
    height: 250,
  },
});

/**
 * This Component represents the higher input field for longer text inputs.
 * The label Text can be adjusted.
 *
 * EXAMPLE:
 *
 * < InputField labelText="Write something here..." />
 */
export default function LongInputField({ labelText, value, onChangeText }) {
  return (
    <SafeAreaView>
      <ScrollView keyboardShouldPersistTaps="handled">
        <TextInput
          style={style.input}
          label={labelText}
          value={value}
          onChangeText={onChangeText}
          underlineColor="transparent"
          textAlignVertical="top"
          multiline
          keyboardType="default"
          blurOnSubmit={true}
          returnKeyType="done"
          theme={{
            colors: {
              primary: theme.colors.neutralsGrey500,
              text: theme.colors.neutralsBlack,
            },
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
