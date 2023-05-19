import React from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import { theme } from '../../../../constants/myTheme';
import TitleArrowHeading from '../../../../components/Texts/TitleArrowHeading';
import PostCard from '../../../../components/Cards/PostCard';
import arrowImage from '../../../../../assets/Images/arrow-image.png';
/**
 * This is the main Interacted Posts View / UI
 * Interacted Posts are mapped here.
 */
export default function InteractedPostsView({
  interactedPosts,
  interactedPostKey,
  title,
  subTitle,
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
        {/* Header Interacted Posts */}
        <View style={{ paddingVertical: 10 }}>
          <TitleArrowHeading
            title="Interacted Posts"
            arrowImage={arrowImage}
            arrowStyle={{ height: 70, width: 100, bottom: 20 }}
          />
        </View>

        {/* Map the Interacted Posts as Cards */}
        {interactedPosts.map((interactedPost) => (
          <PostCard
            key={interactedPost[interactedPostKey]}
            title={interactedPost[title]}
            subTitle={interactedPost[subTitle]}
            buttonText={interactedPost[buttonText]}
            content={interactedPost[content]}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
