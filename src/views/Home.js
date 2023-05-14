import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { theme } from '../constants/myTheme';
import Feed from '../components/Feed';
import MainJoinedGroup from '../components/MainJoinedGroup';
import { selectedGroup } from '../redux/features/mainSlice/mainSlice';

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
