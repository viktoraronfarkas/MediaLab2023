import React from 'react';
import { StyleSheet, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../constants/myTheme';

const style = StyleSheet.create({
  input: {
    borderRadius: 8,
    padding: 20,
    paddingTop: 20,
    fontFamily: theme.fonts.textLink,
    backgroundColor: theme.colors.backgroundWhite,
    height: 250,
  },
  placeholder: {
    color: theme.colors.primary,
  },
});

/**
 * This Component represents the higher input field for longer text inputs.
 * The label Text can be adjusted.
 *
 * EXAMPLE:
 *
 * < InputField placeholderText="Write something here..." />
 */
export default function LongInputField({
  inputStyle,
  placeholderText,
  value,
  onChangeText,
}) {
  return (
    <SafeAreaView>
      <ScrollView keyboardShouldPersistTaps="handled">
        <TextInput
          style={[style.input, inputStyle]}
          textAlignVertical="top"
          placeholder={placeholderText}
          placeholderTextColor={theme.colors.onBackgroundWhite}
          value={value}
          onChangeText={onChangeText}
          underlineColor="transparent"
          multiline
          keyboardType="default"
          blurOnSubmit
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
