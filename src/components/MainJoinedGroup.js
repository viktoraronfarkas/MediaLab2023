import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import circleLineImage from '../../assets/Images/circleLine-image.png';
import {
  selectedGroup,
  SetselectedSubGroup,
  selectedUser,
  IpAddress,
} from '../redux/features/mainSlice/mainSlice';
import SubGroupsFilter from './Buttons/SubGroupsFilter';
import { styles } from '../constants/myTheme';
import TitleCircleHeadingH2 from './Texts/TitleCircleHeading';
import ListItem from './Items/ListItem';
import iconImage from '../../assets/Icons/plus-icon.png';
import underlineArrowImage from '../../assets/Images/under-line-arrow-image.png';
import { MoreSvg } from './svgs';

function MainJoinedGroup() {
  const selectedGroupValue = useSelector(selectedGroup);
  const currentUser = useSelector(selectedUser);
  const clientIpAddress = useSelector(IpAddress);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [subscribedGroups, setSubscribedGroups] = useState([]);
  const [filteredSubgroups, setFilteredSubgroups] = useState([]);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const filterSubgroups = (filter) => {
    // eslint-disable-next-line no-shadow
    let filteredSubgroups = [];

    if (filter === 'all') {
      filteredSubgroups = selectedGroupValue.subgroups;
    } else if (filter === 'joined') {
      filteredSubgroups = selectedGroupValue.subgroups.filter((subgroup) =>
        subscribedGroups.some(
          (group) => group.main_group_id === subgroup.main_group_id
        )
      );
    } else if (filter === 'unjoined') {
      filteredSubgroups = selectedGroupValue.subgroups.filter(
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
  }, [
    currentUser.user_id,
    selectedFilter,
    selectedGroupValue,
    clientIpAddress,
  ]);

  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View style={{ position: 'relative', paddingTop: 30 }}>
        <TitleCircleHeadingH2
          title={selectedGroupValue.name || selectedGroupValue.mainGroupName}
          image={circleLineImage}
          lineStyle={{
            height: 70,
            width: 200,
          }}
        />
        <TouchableOpacity
          style={{ position: 'absolute', left: '41%', top: '80%' }}
        >
          <MoreSvg color="#000" width={50} height={50} />
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
          flexDirection: 'row',
          marginTop: '8%',
          width: '100%',
          justifyContent: 'center',
          alignContent: 'center',
          position: 'relative',
        }}
      >
        <View style={{ position: 'relative' }}>
          <Text style={[styles.headline3, { textAlign: 'center' }]}>
            add a new subgroup
          </Text>
          <Image
            style={{
              left: '12%',
              top: '90%',
              height: 50,
              width: 200,
              position: 'absolute',
            }}
            source={underlineArrowImage}
          />
        </View>

        <View
          style={{
            left: '84%',
            top: '-20%',
            position: 'absolute',
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate('AddSubgroup')}>
            <Image source={iconImage} style={{ height: 48, width: 48 }} />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          marginTop: '20%',
          width: '94%',
        }}
      >
        {/** FIXME : a place holder should take place here instead */}
        {filteredSubgroups.length === 0 ? (
          <Text style={{ textAlign: 'center' }}>
            {selectedGroupValue.subgroups.length === 0
              ? 'There are no subgroups added for this group yet.'
              : 'You have not joined any subgroups yet.'}
          </Text>
        ) : (
          filteredSubgroups.map((subgroup) => (
            <ListItem
              key={subgroup.subgroupId}
              mainTitle={subgroup.name || subgroup.subgroupName}
              subtitle={subgroup.subTitle || subgroup.subgroupName}
              iconImage={require('../../assets/Icons/arrow-right.png')}
              onPress={() => {
                dispatch(SetselectedSubGroup(subgroup));
                navigation.navigate('JoinedSubgroup');
              }}
            />
          ))
        )}
      </View>
    </View>
  );
}

export default MainJoinedGroup;
