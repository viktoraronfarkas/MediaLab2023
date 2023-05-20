import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AboutUsView from './AboutUsView';

/**
 * This is the main Joined Groups Screen
 *
 */
export default function AboutUsScreen() {
  const navigation = useNavigation();
  return (
    <AboutUsView
      onCommunityGuidelines={() => navigation.navigate('communityGuidelines')}
      onDataSecurity={() => navigation.navigate('dataSecurity')}
    />
  );
}
