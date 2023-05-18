import React from 'react';
import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
} from 'react-native';
import { IconButton } from 'react-native-paper';
import { theme } from '../../constants/myTheme';
import CaptionScribbleHeading from '../../components/Texts/CaptionScribbleHeading';
import OrangeSubtitleBodyText from '../../components/Texts/OrangeSubtitleBodyText';
import ProfileImage from '../../components/ProfileImageScribble';
import scribble from '../../../assets/Images/heart-right-image.png';
import underline from '../../../assets/Images/under-line-image.png';
import arrow from '../../../assets/Images/arrow-image.png';

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.colors.backgroundSand,
  },
});

/**
 * This is the User Profile View / UI that is visited from another user, displaying only data.
 */
export default function VisitUserProfileView({
  profileImage,
  biography,
  handleCopy,
  email,
  username,
  name,
  studyProgramme,
}) {
  return (
    <SafeAreaView style={style.container}>
      <ScrollView style={{ paddingHorizontal: 30 }}>
        {/* Header */}
        <View>
          <CaptionScribbleHeading
            subHeading="Only you"
            title="Your Profile"
            scribbleSubHeadingImage={scribble}
            underlineImage={underline}
            arrowImage={arrow}
            lineStyle={{ height: 50, width: 50 }}
          />
        </View>

        {/* Profile Image */}
        <ProfileImage profileImage={profileImage} username={username} />

        {/* User Info */}
        <View style={{ paddingTop: 130 }}>
          <OrangeSubtitleBodyText title="Biography" bodyText={biography} />

          <TouchableOpacity onPress={handleCopy}>
            <OrangeSubtitleBodyText title="Email" bodyText={email} />
            <IconButton
              icon="content-copy"
              style={{
                position: 'absolute',
                alignSelf: 'flex-end',
                top: 10,
              }}
            />
          </TouchableOpacity>

          <OrangeSubtitleBodyText title="Name" bodyText={name} />

          <OrangeSubtitleBodyText
            title="Study Programme"
            bodyText={studyProgramme}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
