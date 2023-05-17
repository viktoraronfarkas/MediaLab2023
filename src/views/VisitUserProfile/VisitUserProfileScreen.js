import React from 'react';
import { ToastAndroid, Alert, Clipboard, Platform } from 'react-native';
import VisitUserProfileView from './VisitUserProfileView';

export default function VisitUserProfile() {
  const email = 'cc201037@fhstp.ac.at';

  const handleCopy = () => {
    Clipboard.setString(email);
    if (Platform.OS === 'android') {
      ToastAndroid.show('The email has been copied.', ToastAndroid.SHORT);
    } else if (Platform.OS === 'ios') {
      Alert.alert('The email has been copied.');
    }
  };
  return (
    <VisitUserProfileView
      // profileImage={profileImage}
      username="Username"
      biography="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
      handleCopy={handleCopy}
      email="cc201028@fhstp.ac.at"
      name="Jane Doe"
      studyProgramme="BCC"
    />
  );
}
