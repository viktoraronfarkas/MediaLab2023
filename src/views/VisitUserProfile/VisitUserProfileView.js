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
import BottomScrollSheet from '../../components/BottomScrollSheet/BottomScrollSheet';
import ProfileImage from '../../components/ProfileImageScribble';
import OrangeSubtitleBodyText from '../../components/Texts/OrangeSubtitleBodyText';
import ClickableText from '../../components/ClickableText';
import DialogAction from '../../components/Dialogs/DialogAction';

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
  onReportUser,
  bottomSheetRef,
  contentComponent,
  alertVisible,
  onPressOkay,
}) {
  return (
    <SafeAreaView style={style.container}>
      <ScrollView style={{ paddingHorizontal: 30 }}>
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
        <ClickableText text="Report User" onPress={onReportUser} />

        {/* When uploadIcon pressed: show this dialog  */}
        <View>
          <DialogAction
            containerStyle={{
              marginVertical: 200,
              marginHorizontal: 15,
              paddingRight: 20,
            }}
            visible={alertVisible}
            text="We will check it!"
            subText="We want everybody to feel safe and welcome, harmful content has no place here. We will check your request and take actions accordingly."
            isDialog
            actions={[
              {
                id: 1,
                text: 'Okay',
                onPress: onPressOkay,
              },
            ]}
          />
        </View>
        <BottomScrollSheet
          bottomSheetRef={bottomSheetRef}
          contentComponent={contentComponent}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
