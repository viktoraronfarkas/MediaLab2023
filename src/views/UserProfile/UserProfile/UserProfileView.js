import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { IconButton } from 'react-native-paper';
import { theme, styles } from '../../../constants/myTheme';

import CaptionScribbleHeading from '../../../components/Texts/CaptionScribbleHeading';
import DialogAction from '../../../components/Dialogs/DialogAction';
import ListItemOnlyText from '../../../components/Items/ListItemOnlyText';
import OrangeSubtitleBodyText from '../../../components/Texts/OrangeSubtitleBodyText';
import ProfileImage from '../../../components/ProfileImageScribble';

import uploadIcon from '../../../../assets/Icons/upload-icon.png';
import scribble from '../../../../assets/Images/heart-right-image.png';
import underline from '../../../../assets/Images/under-line-image.png';
import arrow from '../../../../assets/Images/arrow-image.png';
import iconImage from '../../../../assets/Icons/arrow-right.png';

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.colors.backgroundSand,
  },
});

export default function UserProfileView({
  profileImage,
  onPressProfileImageEdit,
  onPressEditImage,
  onPressDeleteImage,
  onPressCancelDialog,
  alertVisible,
  biography,
  handleCopy,
  email,
  username,
  name,
  onPersonalData,
  onJoinedGroups,
  onJoinedEvents,
  onInteractedPosts,
  studyProgramme,
  onYourPostsEvents,
}) {
  return (
    <View style={style.container}>
      <ScrollView style={{ paddingHorizontal: 30 }}>
        {/* Header */}
        <View style={{ paddingVertical: 40 }}>
          <CaptionScribbleHeading
            subHeading="Only you"
            title="Your Profile"
            headlineStyle={{ width: 180 }}
            scribbleSubHeadingImage={scribble}
            underlineImage={underline}
            arrowImage={arrow}
            underlineStyle={{ height: 140, width: 100 }}
          />
        </View>

        {/* Profile Image */}
        <ProfileImage profileImage={profileImage} username={username} />

        <TouchableOpacity onPress={onPressProfileImageEdit}>
          <Image
            source={uploadIcon}
            style={{
              width: 40,
              height: 40,
              alignSelf: 'flex-end',
              right: 70,
              top: 20,
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* When uploadIcon pressed: show this dialog  */}
        <View>
          <DialogAction
            containerStyle={{
              marginVertical: 200,
              marginHorizontal: 15,
              paddingRight: 20,
            }}
            visible={alertVisible}
            text="Upload or edit your Profile-Picture. You can also delete it or cancel this action"
            isDialog
            actions={[
              {
                id: 1,
                text: 'Delete Picture',
                onPress: onPressDeleteImage,
              },
              { id: 2, text: 'Upload Picture', onPress: onPressEditImage },
            ]}
            optionalButtonText="Cancel"
            onPressOptionalButton={onPressCancelDialog}
          />
        </View>

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

          {/* Settings */}
          <Text style={[styles.headline3, { paddingVertical: 20 }]}>
            account details
          </Text>

          <ListItemOnlyText
            title="personal data"
            iconImage={iconImage}
            onPress={onPersonalData}
            cardContainerStyle={{ marginVertical: 7, paddingVertical: 1 }}
          />
          <ListItemOnlyText
            title="joined groups"
            iconImage={iconImage}
            onPress={onJoinedGroups}
            cardContainerStyle={{ marginVertical: 7, paddingVertical: 1 }}
          />
          <ListItemOnlyText
            title="joined events"
            iconImage={iconImage}
            onPress={onJoinedEvents}
            cardContainerStyle={{ marginVertical: 7, paddingVertical: 1 }}
          />
          <ListItemOnlyText
            title="interacted posts"
            iconImage={iconImage}
            onPress={onInteractedPosts}
            cardContainerStyle={{ marginVertical: 7, paddingVertical: 1 }}
          />
          <ListItemOnlyText
            title="your posts & events"
            iconImage={iconImage}
            onPress={onYourPostsEvents}
            cardContainerStyle={{ marginVertical: 7, paddingVertical: 1 }}
          />
          <ListItemOnlyText
            title="help"
            iconImage={iconImage}
            onPress={onYourPostsEvents}
            cardContainerStyle={{ marginVertical: 7, paddingVertical: 1 }}
          />
          <ListItemOnlyText
            title="about us"
            iconImage={iconImage}
            onPress={onYourPostsEvents}
            cardContainerStyle={{ marginVertical: 7, paddingVertical: 1 }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
