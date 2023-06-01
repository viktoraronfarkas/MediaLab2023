import React from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import { theme } from '../../../../constants/myTheme';
import TitleArrowHeading from '../../../../components/Texts/TitleArrowHeading';
import ListItemOnlyText from '../../../../components/Items/ListItemOnlyText';
import arrowImage from '../../../../../assets/Images/arrow-image.png';
import iconImage from '../../../../../assets/Icons/arrow-right.png';

/**
 * This is the main AboutUsView
 *
 */
export default function AboutUsView({ onCommunityGuidelines, onDataSecurity }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{
          paddingHorizontal: 15,
          paddingTop: 30,
          backgroundColor: theme.colors.backgroundSand,
        }}
      >
        {/* Header Help */}
        <View style={{ paddingVertical: 10 }}>
          <TitleArrowHeading
            title="About Us"
            arrowImage={arrowImage}
            arrowStyle={{ height: 70, width: 100, bottom: 20 }}
          />
        </View>
        <ListItemOnlyText
          title="Community Guidelines"
          iconImage={iconImage}
          onPress={onCommunityGuidelines}
          cardContainerStyle={{ marginVertical: 7, paddingVertical: 1 }}
        />
        <ListItemOnlyText
          title="Data Security"
          iconImage={iconImage}
          onPress={onDataSecurity}
          cardContainerStyle={{ marginVertical: 7, paddingVertical: 1 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
