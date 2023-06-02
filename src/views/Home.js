import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React, { useCallback, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import Feed from '../components/Feed';
import { theme } from '../constants/myTheme';

import GroupsTopBar from '../components/GroupsTopHorizontalBar';
import MainJoinedGroup from '../components/MainJoinedGroup';

import {
  IpAddress,
  mainGroups,
  selectedGroup,
  setCurrentUserId,
  setMainGroups,
} from '../redux/features/mainSlice/mainSlice';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundCamel,
  },
});
function HomeContent() {
  const selectedGroupValue = useSelector(selectedGroup);
  const clientIpAddress = useSelector(IpAddress);

  const dispatch = useDispatch();
  const fetechedMainGroups = useSelector(mainGroups);

  const fetchMainGroups = async () => {
    try {
      const response = await axios.get(
        `http://${clientIpAddress}:3001/maingroup`
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
          console.log(value);
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

  return (
    <SafeAreaView edges={['left', 'right']} style={styles.container}>
      <GroupsTopBar preDefinedGroups={fetechedMainGroups} />

      <ScrollView style={{ flex: 1 }}>
        {!selectedGroupValue.mainGroupName ? <Feed /> : <MainJoinedGroup />}
      </ScrollView>
    </SafeAreaView>
  );
}

export default function Home() {
  return <HomeContent />;
}
