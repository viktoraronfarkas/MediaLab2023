import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../constants/myTheme';
import Feed from '../components/Feed';

import GroupsTopBar from '../components/GroupsTopHorizontalBar';
import MainJoinedGroup from '../components/MainJoinedGroup';

import {
  selectedGroup,
  IpAddress,
  setCurrentUserId,
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

  const [mainGroups, setMainGroups] = useState([]);
  const dispatch = useDispatch();

  const fetchMainGroups = async () => {
    try {
      const response = await axios.get(
        `http://${clientIpAddress}:3001/maingroup`
      );
      const mainGroupsData = response.data;

      // Fetch posts and events for each subgroup
      const mainGroupsWithData = await Promise.all(
        mainGroupsData.map(async (mainGroup) => {
          const subgroupsWithData = await Promise.all(
            mainGroup.subgroups.map(async (subgroup) => {
              const postsResponse = await axios.get(
                `http://${clientIpAddress}:3001/subgroup/${subgroup.subgroup_id}/posts`
              );
              const eventsResponse = await axios.get(
                `http://${clientIpAddress}:3001/subgroup/${subgroup.subgroup_id}/events`
              );

              subgroup.posts = postsResponse.data;
              subgroup.events = eventsResponse.data;

              return subgroup;
            })
          );

          mainGroup.subgroups = subgroupsWithData;

          return mainGroup;
        })
      );

      setMainGroups(mainGroupsWithData);
    } catch (error) {
      console.error('Error fetching main groups:', error);
    }
  };

  useEffect(() => {
    console.log('fetched');
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
    // console.log(userId);
    // dispatch(setCurrentUser(userId));
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
      <GroupsTopBar preDefinedGroups={mainGroups} />

      <ScrollView style={{ flex: 1 }}>
        {!selectedGroupValue.mainGroupName ? <Feed /> : <MainJoinedGroup />}
      </ScrollView>
    </SafeAreaView>
  );
}

export default function Home() {
  return <HomeContent />;
}
