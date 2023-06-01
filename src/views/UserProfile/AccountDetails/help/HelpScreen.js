import React from 'react';
import { useNavigation } from '@react-navigation/native';
import HelpView from './HelpView';

/**
 * This is the main Joined Groups Screen
 *
 */
export default function HelpScreen() {
  const navigation = useNavigation();

  return <HelpView onQuickTour={() => navigation.navigate('quickTour')} />;
}
