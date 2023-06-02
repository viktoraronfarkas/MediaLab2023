import { useIsFocused, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import iconImage from '../../assets/Icons/plus-icon.png';
import circleLineImage from '../../assets/Images/circleLine-image.png';
import underlineArrowImage from '../../assets/Images/under-line-arrow-image.png';
import { styles } from '../constants/myTheme';
import { MoreSvg } from './svgs';
import {
  IpAddress,
  SetselectedSubGroup,
  selectedGroup,
  selectedUserId,
  setSelectedMainGroup,
  setMianGroups,
} from '../redux/features/mainSlice/mainSlice';
import SubGroupsFilter from './Buttons/SubGroupsFilter';
import ListItem from './Items/ListItem';
import TitleCircleHeadingH2 from './Texts/TitleCircleHeading';
import BottomScrollSheet from './BottomScrollSheet/BottomScrollSheet';
import OptionsLeaveGroupSheet from './BottomScrollSheet/OptionsLeaveGroupSheet';

// import { MoreSvg } from './svgs';

function MainJoinedGroup() {
  const selectedGroupValue = useSelector(selectedGroup);
  const clientIpAddress = useSelector(IpAddress);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [subscribedGroups, setSubscribedGroups] = useState([]);
  const [filteredSubgroups, setFilteredSubgroups] = useState([]);
  const currentSelectedUserId = useSelector(selectedUserId);
  const isFocused = useIsFocused();
  const refRBSheet = useRef();

  const navigation = useNavigation();
  const dispatch = useDispatch();

  let message = '';

  console.log(subscribedGroups.length);
  if (selectedGroupValue.subgroups.length === 0) {
    message =
      'There are no subgroups here yet. Click on the plus button above to create your own subgroups!';
  } else if (subscribedGroups.length === 0) {
    message = 'You have not joined any subgroups yet.';
  } else {
    const unjoinedSubgroups = selectedGroupValue.subgroups.filter(
      (subgroup) =>
        !subscribedGroups.some(
          (group) => group.subgroup_id === subgroup.subgroupId
        )
    );
    if (unjoinedSubgroups.length === 0) {
      message = 'You have already joined all available subgroups.';
    } else {
      message = 'You have not joined any subgroups yet.';
    }
  }

  const filterSubgroups = (filter) => {
    // eslint-disable-next-line no-shadow
    let filteredSubgroups = [];

    if (filter === 'all') {
      filteredSubgroups = selectedGroupValue.subgroups;
    } else if (filter === 'joined') {
      filteredSubgroups = selectedGroupValue.subgroups.filter((subgroup) =>
        subscribedGroups.some(
          (group) => group.subgroup_id === subgroup.subgroupId
        )
      );
    } else if (filter === 'unjoined') {
      filteredSubgroups = selectedGroupValue.subgroups.filter(
        (subgroup) =>
          !subscribedGroups.some(
            (group) => group.subgroup_id === subgroup.subgroupId
          )
      );
    }

    // console.log(filteredSubgroups);
    setFilteredSubgroups(filteredSubgroups);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    filterSubgroups(filter);
  };

  const fetchSubscribedGroups = async () => {
    try {
      const response = await axios.get(
        `http://${clientIpAddress}:3001/user/${currentSelectedUserId}/subscribed-groups`
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

  const fetchMainGroups = async () => {
    // Implement the logic to fetch main groups here
    // Replace this with your actual implementation
    try {
      const response = await axios.get(
        `http://${clientIpAddress}:3001/maingroup`
      );
      const mainGroupsData = response.data;
      dispatch(setMianGroups(mainGroupsData));
    } catch (error) {
      console.error('Error fetching main groups:', error);
    }
  };
  useEffect(() => {
    fetchSubscribedGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentSelectedUserId,
    selectedFilter,
    selectedGroupValue,
    clientIpAddress,
  ]);

  useEffect(() => {
    if (isFocused) {
      fetchSubscribedGroups();
    }
  }, [isFocused]);

  useEffect(() => {
    // Update the filter when subscribedGroups change
    filterSubgroups(selectedFilter);
  }, [subscribedGroups]);

  useEffect(() => {
    // Fetch main groups when component mounts
    fetchMainGroups();

    // Cleanup function to be called when component unmounts
    return () => {
      // Fetch main groups when component unmounts (leaving the component)
      fetchMainGroups();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const unsubscribeFromMainGroup = async (userId, mainGroupId) => {
    try {
      const response = await axios.post(
        `http://${clientIpAddress}:3001/user/${userId}/unsubscribe/maingroup`,
        { userId, mainGroupId }
      );
      // Handle successful response
      console.log(response.data);
      // TODO: Update the UI or perform any other necessary actions
    } catch (error) {
      // Handle error
      console.error(error);
      // TODO: Show an error message to the user or perform any other necessary actions
      console.log('error');
    }
  };

  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <BottomScrollSheet
        bottomSheetRef={refRBSheet}
        contentComponent={
          <OptionsLeaveGroupSheet
            sheetTitle={`Leave ${selectedGroupValue.mainGroupName} Group?`}
            leaveText="Yes"
            cancelText="Nevermind"
            onCancel={() => {
              refRBSheet.current.close(); // Close the bottom sheet
            }}
            onLeave={() => {
              unsubscribeFromMainGroup(
                currentSelectedUserId,
                selectedGroupValue.mainGroupId
              ).then(() => {
                // Close the bottom sheet
                refRBSheet.current.close();
                dispatch(setSelectedMainGroup(''));
              });
            }}
          />
        }
      />
      <View style={{ position: 'relative', paddingTop: 40 }}>
        <TitleCircleHeadingH2
          title={selectedGroupValue.name || selectedGroupValue.mainGroupName}
          image={circleLineImage}
          lineStyle={{
            height: 60,
            width: 190,
          }}
        />
        <TouchableOpacity
          style={{ position: 'absolute', left: '41%', top: '80%' }}
          onPress={() => refRBSheet.current.open()}
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
          selectedValue={selectedFilter}
          disabled={selectedGroupValue.subgroups.length === 0}
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
              width: 210,
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
          <Text style={[styles.bodyDefault, { textAlign: 'center' }]}>
            {message}
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
                navigation.navigate('Subgroup');
              }}
            />
          ))
        )}
      </View>
    </View>
  );
}

export default MainJoinedGroup;
