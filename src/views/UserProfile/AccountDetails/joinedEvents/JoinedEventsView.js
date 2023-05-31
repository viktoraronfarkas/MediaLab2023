import React from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import { theme } from '../../../../constants/myTheme';
import TitleArrowHeading from '../../../../components/Texts/TitleArrowHeading';
import EventCard from '../../../../components/Cards/EventCard';
import arrowImage from '../../../../../assets/Images/arrow-image.png';

/**
 * This is the main Joined Events Screen
 * Joined Events are mapped here.
 */
export default function JoinedEventsView({
  joinedEvents,
  joinedEventKey,
  joinedTotal,
  title,
  subTitle,
  cardImage,
}) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{
          paddingHorizontal: 15,
          backgroundColor: theme.colors.backgroundSand,
        }}
      >
        {/* Header Events */}
        <View style={{ paddingVertical: 10, marginTop: 20 }}>
          <TitleArrowHeading
            title="Joined Events"
            arrowImage={arrowImage}
            arrowStyle={{ height: 70, width: 100, bottom: 20 }}
          />
        </View>

        {/* Map the Events as Cards */}
        {joinedEvents.map((joinedEvent) => (
          <EventCard
            key={joinedEvent[joinedEventKey]}
            joiningNumber={joinedEvent[joinedTotal]}
            title={joinedEvent[title]}
            subTitle={joinedEvent[subTitle]}
            cardImage={joinedEvent[cardImage]}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
