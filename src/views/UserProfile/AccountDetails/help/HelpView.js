import React from 'react';
import { View, ScrollView } from 'react-native';
import { theme } from '../../../../constants/myTheme';
import TitleArrowHeading from '../../../../components/Texts/TitleArrowHeading';
import ListItemOnlyText from '../../../../components/Items/ListItemOnlyText';
import arrowImage from '../../../../../assets/Images/arrow-image.png';
import iconImage from '../../../../../assets/Icons/arrow-right.png';
/**
 * This is the main Help View
 *
 */
export default function HelpView({ onQuickTour }) {
  return (
    <View>
      <ScrollView
        style={{
          paddingHorizontal: 15,
          backgroundColor: theme.colors.backgroundSand,
        }}
      >
        {/* Header Help */}
        <View style={{ paddingVertical: 10 }}>
          <TitleArrowHeading
            title="Help"
            arrowImage={arrowImage}
            arrowStyle={{ height: 70, width: 100, bottom: 20 }}
          />
        </View>
        <ListItemOnlyText
          title="quick-tour"
          iconImage={iconImage}
          onPress={onQuickTour}
          cardContainerStyle={{ marginVertical: 7, paddingVertical: 1 }}
        />
      </ScrollView>
    </View>
  );
}
