import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import Feed from '../components/Feed';
import { theme } from '../constants/myTheme';

import GroupsTopBar from '../components/GroupsTopHorizontalBar';
import MainJoinedGroup from '../components/MainJoinedGroup';

import {
  mainGroups,
  selectedGroup,
  setCurrentUserId,
  setMainGroups,
  selectedUserId,
} from '../redux/features/mainSlice/mainSlice';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundCamel,
  },
  overlay: {
    // ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
function HomeContent() {
  const selectedGroupValue = useSelector(selectedGroup);

  const dispatch = useDispatch();
  const fetechedMainGroups = useSelector(mainGroups);
  const userId = useSelector(selectedUserId);

  const fetchMainGroups = async () => {
    try {
      const response = await axios.get(
        `https://medialab-server.vercel.app/maingroup`
      );
      const mainGroupsData = response.data;
      dispatch(setMainGroups(mainGroupsData));
    } catch (error) {
      console.error('Error fetching main groups:', error);
    }
  };

  useEffect(() => {
    // Retrieve userId from localStorage
    const retrieveUserId = async () => {
      try {
        const value = await AsyncStorage.getItem('userID');
        if (value !== null) {
          dispatch(setCurrentUserId(value));
        }
      } catch (e) {
        // handle error
      }
    };

    retrieveUserId();
    fetchMainGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchMainGroups();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );
  function renderContent() {
    if (selectedGroupValue.mainGroupName) {
      return (
        <View style={styles.container}>
          <MainJoinedGroup />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Feed />
      </View>
    );
  }
  return (
    <SafeAreaView edges={['left', 'right']} style={styles.container}>
      <GroupsTopBar preDefinedGroups={fetechedMainGroups} />

      <View style={{ flex: 1 }}>{renderContent()}</View>
    </SafeAreaView>
  );
}

export default function Home() {
  return <HomeContent />;
}
