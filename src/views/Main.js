import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import BottomNav from '../components/BottomNavigation';
import GroupsTopBar from '../components/GroupsTopHorizontalBar';
import { HomeSvg, MessageSvg, ProfileSvg, SearchSvg } from '../components/svgs';
import { IpAddress } from '../redux/features/mainSlice/mainSlice';

export default function Main() {
  const [mainGroups, setMainGroups] = useState([]);
  const clientIpAddress = useSelector(IpAddress);

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
    fetchMainGroups();
  }, []);

  return (
    <SafeAreaView edges={['left', 'right', 'top']} style={{ flex: 1 }}>
      <GroupsTopBar preDefinedGroups={mainGroups} />
      <View style={{ flex: 1 }}>
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