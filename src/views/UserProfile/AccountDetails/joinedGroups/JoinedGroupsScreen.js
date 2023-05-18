import React, { useEffect, useState } from 'react';
import JoinedGroupsView from './JoinedGroupsView';

/**
 * This is the main Joined Groups Screen.
 * Main and Sub Groups are fetched here.
 *
 */
export default function JoinedGroupsScreen() {
  const [maingroups, setMaingroups] = useState([]);
  const [subgroups, setSubgroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Perform API request to fetch maingroups
        const maingroupsResponse = await fetch('MAINGROUPS_API_ENDPOINT_URL');
        const maingroupsData = await maingroupsResponse.json();

        // Perform API request to fetch subgroups
        const subgroupsResponse = await fetch('SUBGROUPS_API_ENDPOINT_URL');
        const subgroupsData = await subgroupsResponse.json();

        // Update the state variable with the fetched subgroups
        setMaingroups(maingroupsData);
        setSubgroups(subgroupsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <JoinedGroupsView
      maingroups={maingroups}
      maingroupKey
      maingroupImage
      maingroupTitle
      subgroups={subgroups}
      subgroupKey="subgroupKey"
      subgroupMainTitle="subgroupMainTitle"
      subgroupSubTitle="subgroupSubTitle"
    />
  );
}
