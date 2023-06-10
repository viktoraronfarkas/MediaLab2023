import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native-paper';
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
  selectedUserId,
  setFeed,
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
  const clientIpAddress = useSelector(IpAddress);

  const dispatch = useDispatch();
  const fetechedMainGroups = useSelector(mainGroups);
  const [loading, setLoading] = useState(true);
  const userId = useSelector(selectedUserId);

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

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://${clientIpAddress}:3001/user/${userId}/feed`
      );
      if (res.data.length === 0) {
        setFeed([]); // Set the feed state to an empty array
        setLoading(false); // Set loading to false if no posts are found
        return; // Exit the function
      }
      dispatch(setFeed(res.data));
      console.log(res.data);
      setLoading(false); // Set loading to false after the feed is fetched (whether it succeeds or fails)
    } catch (error) {
      console.error('Error retrieving feed:', error);
    }
  };
  useEffect(() => {
    setLoading(true); // Set loading to true before fetching the feed

    fetchPosts();
  }, [clientIpAddress, userId]);

  useEffect(() => {
    if (!selectedGroupValue.mainGroupName) {
      fetchPosts();
    }
  }, [selectedGroupValue]);

  function renderContent() {
    if (selectedGroupValue.mainGroupName) {
      return (
        <ScrollView style={styles.container}>
          <MainJoinedGroup />
        </ScrollView>
      );
    }

    if (loading) {
      return (
        <View style={[styles.overlay, { flex: 1 }]}>
          <ActivityIndicator animating color={theme.colors.primary} />
        </View>
      );
    }

    return (
      <ScrollView style={styles.container}>
        <Feed />
      </ScrollView>
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
