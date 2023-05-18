import React from 'react';
import { View, ScrollView } from 'react-native';
import { theme } from '../../../../constants/myTheme';
import TitleArrowHeading from '../../../../components/Texts/TitleArrowHeading';
import arrowImage from '../../../../../assets/Images/arrow-image.png';

/**
 * This is the main Joined Groups Screen
 *
 */
export default function JoinedEventsView() {
  return (
    <View>
      <ScrollView
        style={{
          paddingHorizontal: 15,
          backgroundColor: theme.colors.backgroundSand,
        }}
      >
        {/* Header Events */}
        <View style={{ paddingVertical: 10 }}>
          <TitleArrowHeading
            title="Joined Events"
            arrowImage={arrowImage}
            arrowStyle={{ height: 70, width: 100, bottom: 20 }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
