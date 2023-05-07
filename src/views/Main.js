import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNav from '../components/BottomNavigation';
import { HomeSvg, MessageSvg, ProfileSvg, SearchSvg } from '../components/SVG';

export default function Main() {
  return (
    <SafeAreaView
      edges={['left', 'right']}
      style={{ flex: 1, backgroundColor: 'red' }}
    >
      <View style={{ flex: 1, backgroundColor: 'red' }}>
        <BottomNav
          HomeSvgFocused={<HomeSvg color="#F34F34" />}
          HomeSvgUnfocused={<HomeSvg color="#000" />}
          SearchSvgFocused={<SearchSvg color="#F34F34" />}
          SearchSvgUnfocused={<SearchSvg color="#000" />}
          MessageSvgFocused={<MessageSvg color="#F34F34" />}
          MessageSvgUnfocused={<MessageSvg color="#000" />}
          ProfileSvgFocused={<ProfileSvg color="#F34F34" />}
          ProfileSvgUnfocused={<ProfileSvg color="#000" />}
        />
      </View>
    </SafeAreaView>
  );
}
