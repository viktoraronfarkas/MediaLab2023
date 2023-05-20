import React, { useRef, useState } from 'react';
import { ToastAndroid, Alert, Clipboard, Platform } from 'react-native';
import VisitUserProfileView from './VisitUserProfileView';
import UserReportBottomSheet from '../../components/BottomScrollSheet/UserReportBottomSheet';

/**
 * This is the User Profile Screen that is visited from another user, displaying only data.
 * However the visiting users can report this user profile.
 *
 * The data of the user is fetched here. Also the functionalities are handled here.
 */

// TODO Add Functionalities to the reports (Backend)
export default function VisitUserProfile() {
  const [dialogVisible, setDialogVisible] = useState(false);
  const refRBSheet = useRef();

  const email = 'cc201037@fhstp.ac.at'; // add this to the backend
  const handleCopy = () => {
    Clipboard.setString(email);
    if (Platform.OS === 'android') {
      ToastAndroid.show('The email has been copied.', ToastAndroid.SHORT);
    } else if (Platform.OS === 'ios') {
      Alert.alert('The email has been copied.');
    }
  };

  const reportUserOptions = () => {
    // open bottom sheet
    refRBSheet.current.open();
  };

  const onHateSpeech = () => {
    refRBSheet.current.close();
    setTimeout(() => {
      setDialogVisible(true);
    }, 200);
  };
  const onSpam = () => {
    refRBSheet.current.close();
    setTimeout(() => {
      setDialogVisible(true);
    }, 200);
  };
  const onInappropriateContent = () => {
    refRBSheet.current.close();
    setTimeout(() => {
      setDialogVisible(true);
    }, 200);
  };
  const onOther = () => {
    refRBSheet.current.close();
    setTimeout(() => {
      setDialogVisible(true);
    }, 200);
  };

  return (
    <VisitUserProfileView
      // profileImage={profileImage}
      username="Username"
      biography="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
      handleCopy={handleCopy}
      email={email}
      name="Jane Doe"
      studyProgramme="BCC"
      onReportUser={reportUserOptions}
      bottomSheetRef={refRBSheet}
      contentComponent={
        <UserReportBottomSheet
          onHateSpeech={onHateSpeech}
          onSpam={onSpam}
          onInappropriateContent={onInappropriateContent}
          onOther={onOther}
          onNeverMind={() => refRBSheet.current.close()}
        />
      }
      alertVisible={dialogVisible}
      onPressOkay={() => setDialogVisible(false)}
    />
  );
}
