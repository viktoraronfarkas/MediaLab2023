import React from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import { theme } from '../../../../constants/myTheme';
import TitleArrowHeading from '../../../../components/Texts/TitleArrowHeading';
import EventCard from '../../../../components/Cards/EventCard';
import PostCard from '../../../../components/Cards/PostCard';
import arrowImage from '../../../../../assets/Images/arrow-image.png';
/**
 * This is the main Posts and Events View / UI
 *  Posts and Events are mapped here.
 */
export default function YourPostsEventsView({
  joinedEvents,
  joinedEventKey,
  joinedTotal,
  eventTitle,
  eventSubTitle,
  cardImage,

  yourPosts,
  yourPostKey,
  postTitle,
  postSubTitle,
  buttonText,
  content,
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
        <View style={{ paddingVertical: 10 }}>
          <TitleArrowHeading
            title="Your Posts & Events"
            arrowImage={arrowImage}
            arrowStyle={{ height: 70, width: 100, bottom: 20 }}
          />
        </View>

        {/* Map the Events as Cards */}
        {joinedEvents.map((event) => (
          <EventCard
            key={event[joinedEventKey]}
            joiningNumber={event[joinedTotal]}
            title={event[eventTitle]}
            subTitle={event[eventSubTitle]}
            cardImage={event[cardImage]}
          />
        ))}

        {/* Map the  Posts as Cards */}
        {yourPosts.map((post) => (
          <PostCard
            key={post[yourPostKey]}
            title={post[postTitle]}
            subTitle={post[postSubTitle]}
            buttonText={post[buttonText]}
            content={post[content]}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
