import React from 'react';
import HelpView from './QuickTourView';

/**
 * This is the main Joined Groups Screen
 *
 */
export default function QuickTourScreen() {
  return (
    <HelpView
      source={require('../../../../../../assets/video/quicktour.mp4')}
    />
  );
}
