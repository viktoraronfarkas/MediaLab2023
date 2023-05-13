/* eslint-disable global-require */
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PostCard from '../components/Cards/PostCard';
import EventCard from '../components/Cards/EventCard';
import { theme } from '../constants/myTheme';
import Feed from '../components/Feed';
import MainJoinedGroup from '../components/MainJoinedGroup';
import { selectedGroup } from '../redux/features/mainSlice/mainSlice';
import { useSelector } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundCamel,
  },
});
function HomeContent() {
  const value = useSelector(selectedGroup);

  return (
    <SafeAreaView edges={['left', 'right']} style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        {!value.name ? <Feed /> : <MainJoinedGroup />}
      </ScrollView>
    </SafeAreaView>
  );
}
export default function Home() {
  return <HomeContent />;
}
