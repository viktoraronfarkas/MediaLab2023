import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { theme, styles } from '../../../../constants/myTheme';

import TitleArrowHeading from '../../../../components/Texts/TitleArrowHeading';
import GreyButton from '../../../../components/Buttons/GreyButton';

import arrowImage from '../../../../../assets/Images/arrow-image.png';

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.colors.backgroundSand,
  },
});
/**
 * This is the main Personal Data View
 *
 */
export default function PersonalDataView() {
  return (
    <View style={style.container}>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        {/* Header */}
        <View style={{ paddingVertical: 30 }}>
          <TitleArrowHeading
            title="personal data"
            arrowImage={arrowImage}
            arrowStyle={{ height: 70, width: 100, bottom: 20 }}
          />
        </View>

        {/* User Input Data */}
        <Text style={styles.subtitle1}> your email</Text>
        <Text style={styles.subtitle1}> username</Text>
        <Text style={styles.subtitle1}> name</Text>
        <Text style={styles.subtitle1}> study programme</Text>
        <Text style={styles.subtitle1}> password</Text>

        <GreyButton
          text="save changes"
          styleButton={{ alignSelf: 'center', width: '100%' }}
        />
      </ScrollView>
    </View>
  );
}
