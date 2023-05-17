import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import moreMenuIcon from '../../assets/Icons/more-menu-icon.png';
import iconImage from '../../assets/Icons/plus-icon.png';
import circleLineImage from '../../assets/Images/circleLine-image.png';
import { styles } from '../constants/myTheme';
import {
  IpAddress,
  selectedGroup,
  selectedUser,
} from '../redux/features/mainSlice/mainSlice';
import SubGroupsFilter from './Buttons/SubGroupsFilter';
import ListItem from './Items/ListItem';
import TitleCircleHeadingH2 from './Texts/TitleCircleHeading';

function MainJoinedGroup() {
  const value = useSelector(selectedGroup);
  const currentUser = useSelector(selectedUser);
  const clientIpAddress = useSelector(IpAddress);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [subscribedGroups, setSubscribedGroups] = useState([]);
  const [filteredSubgroups, setFilteredSubgroups] = useState([]);

  const filterSubgroups = (filter) => {
    // eslint-disable-next-line no-shadow
    let filteredSubgroups = [];

    if (filter === 'all') {
      filteredSubgroups = value.subgroups;
    } else if (filter === 'joined') {
      filteredSubgroups = value.subgroups.filter((subgroup) =>
        subscribedGroups.some(
          (group) => group.main_group_id === subgroup.main_group_id
        )
      );
    } else if (filter === 'unjoined') {
      filteredSubgroups = value.subgroups.filter(
        (subgroup) =>
          !subscribedGroups.some(
            (group) => group.main_group_id === subgroup.main_group_id
          )
      );
    }

    setFilteredSubgroups(filteredSubgroups);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    filterSubgroups(filter);
  };

  useEffect(() => {
    const fetchSubscribedGroups = async () => {
      try {
        const response = await axios.get(
          `http://${clientIpAddress}:3001/user/${currentUser.user_id}/subscribed-groups`
        );
        const { mainGroups, subGroups } = response.data;

        const fetchedSubscribedGroups = mainGroups.concat(subGroups);
        setSubscribedGroups(fetchedSubscribedGroups);

        // Filter the subgroups based on the initial filter value
        filterSubgroups(selectedFilter);
      } catch (error) {
        console.error('Error retrieving subscribed groups:', error);
        // Handle the error
      }
    };

    fetchSubscribedGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.user_id, selectedFilter, value, clientIpAddress]);

  const handlePress = () => {
    // Handle the press event
  };

  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View style={{ position: 'relative' }}>
        <TitleCircleHeadingH2
          title={value.mainGroupName}
          image={circleLineImage}
          lineStyle={{
            height: 70,
            width: 200,
          }}
        />
        <TouchableOpacity
          style={{ position: 'absolute', left: '44%', top: '50%' }}
        >
          <Image
            style={{
              height: 20,
              width: 5,
            }}
            source={moreMenuIcon}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          width: '100%',
          marginTop: '10%',
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <SubGroupsFilter
          firstFilterLabel="all"
          secondFilterLabel="joined"
          thirdFilterLabel="unjoined"
          onFilterChange={handleFilterChange}
        />
      </View>

      <View
        style={{
          marginTop: '3%',
          marginBottom: '3%',
          width: '85%',
        }}
      >
        {filteredSubgroups.length === 0 ? (
          <Text>
            {value.subgroups.length === 0
              ? 'There are no subgroups added for this group yet.'
              : 'You have not joined any subgroups yet.'}
          </Text>
        ) : (
          filteredSubgroups.map((subgroup) => (
            <ListItem
              key={subgroup.subgroupId}
              mainTitle={subgroup.subgroupName}
              subtitle={subgroup.subgroupName}
              iconImage={require('../../assets/Icons/arrow-right.png')}
              onPress={handlePress}
            />
          ))
        )}
      </View>

      <TouchableOpacity
        style={styles.newItemButton}
        onPress={() => handlePress()}
      >
        <Image style={styles.newItemButtonIcon} source={iconImage} />
      </TouchableOpacity>
    </View>
  );
}

export default MainJoinedGroup;
