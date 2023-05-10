import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../../../constants/myTheme';
import OrangeButton from '../../../components/Buttons/OrangeButton';
import CaptionScribbleHeading from '../../../components/Texts/CaptionScribbleHeading';

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: theme.colors.backgroundSand,
  },
});

export default function RegistrationPageThreeView({ handleSubmit }) {
  return (
    <SafeAreaView style={style.container}>
      <ScrollView>
        <CaptionScribbleHeading
          subHeading="click down below, to add groups:"
          title="Before you’re good to go, here are some groups you can join right away:"
          headlineStyle={{ width: 350 }}
        />
        <OrangeButton
          text="Finish"
          onPress={handleSubmit}
          styleButton={{ alignSelf: 'center', width: '100%' }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
