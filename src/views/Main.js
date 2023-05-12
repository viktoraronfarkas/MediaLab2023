import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNav from '../components/BottomNavigation';
import { HomeSvg, MessageSvg, ProfileSvg, SearchSvg } from '../components/SVG';
import GroupsTopBar from '../components/GroupsTopHorizontalBar';
import preDefinedGroupsObject from '../TestData/predefinedGroups';
import axios from 'axios';

export default function Main() {
  const [mainGroups, setMainGroups] = useState([]);

  const fetchMainGroups = async () => {
    try {
      const response = await axios.get('http://10.5.13.150:3000/maingroup');
      const mainGroupsData = response.data;

      // Fetch posts and events for each subgroup
      const mainGroupsWithData = await Promise.all(
        mainGroupsData.map(async (mainGroup) => {
          const subgroupsWithData = await Promise.all(
            mainGroup.subgroups.map(async (subgroup) => {
              const postsResponse = await axios.get(
                `http://10.5.13.150:3000/subgroup/${subgroup.subgroup_id}/posts`
              );
              const eventsResponse = await axios.get(
                `http://localhost:3000/subgroup/${subgroup.subgroup_id}/events`
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
      <GroupsTopBar preDefinedGroups={preDefinedGroupsObject} />
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
