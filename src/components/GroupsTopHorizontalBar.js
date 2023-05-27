import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { theme } from '../constants/myTheme';
import iconImage from '../../assets/Icons/plus-icon.png';
import AddIconInteraction from './Buttons/AddIconInteraction';
import {
  setSelectedMainGroup,
  selectedGroup,
  selectedUser,
  IpAddress,
} from '../redux/features/mainSlice/mainSlice';

export default function GroupsTopBar({ preDefinedGroups }) {
  const selectedGroupValue = useSelector(selectedGroup);
  const currentUser = useSelector(selectedUser);
  const clientIpAddress = useSelector(IpAddress);
  const [subscribedGroups, setSubscribedGroups] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSubscribedGroups = async () => {
      try {
        const response = await axios.get(
          `http://${clientIpAddress}:3001/user/${currentUser.user_id}/subscribed-groups`
        );
        const { mainGroups } = response.data;

        // Filter the predefined groups based on the user's subscribed groups
        const subscribed = preDefinedGroups.filter((group) =>
          mainGroups.some(
            (mainGroup) => mainGroup.main_group_id === group.mainGroupId
          )
        );
        setSubscribedGroups(subscribed);
      } catch (error) {
        console.error('Error retrieving subscribed groups:', error);
        // Handle the error
      }
    };

    fetchSubscribedGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.user_id, preDefinedGroups]);

  // navigate to REGISTRATION Screen
  const navigation = useNavigation();

  const scrollViewRef = useRef();

  const handlePress = async (groupName) => {
    const groupIndex = preDefinedGroups.findIndex(
      (group) => group.mainGroupName === groupName
    );

    const group = preDefinedGroups[groupIndex];

    if (groupName !== 'Feed') {
      // Check if the selected group is present in the user's subscribed groups
      dispatch(setSelectedMainGroup(group));
      navigation.navigate('MainScreen');
    } else {
      dispatch(setSelectedMainGroup(''));
    }

    // calculate the offset based on the index and width of each item
    const offset = groupIndex * 48;

    // scroll to the selected item
    scrollViewRef.current.scrollTo({ x: offset, y: 0, animated: true });
  };

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        style={{
          flexGrow: 0,
          backgroundColor: theme.colors.backgroundSand,
        }}
      >
        <TouchableOpacity onPress={() => handlePress('Feed')}>
          <View
            key="Feed"
            style={{
              padding: 10,
              position: 'relative',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: !selectedGroupValue.mainGroupName
                  ? theme.colors.primary
                  : 'white',
              }}
            >
              <Text
                style={{
                  color: !selectedGroupValue.mainGroupName
                    ? 'white'
                    : theme.colors.primary,
                  textAlignVertical: 'center',
                  textAlign: 'center',
                  fontSize: 17,
                  fontWeight: 700,
                  fontFamily: 'Nunito',
                }}
              >
                Feed
              </Text>
            </View>
            <View
              style={{
                position: 'absolute',
                top: 0,
                height: 5,
                width: 50,
                backgroundColor: 'black',
                opacity: !selectedGroupValue.mainGroupName ? 1 : 0,
                borderRadius: 20,
              }}
            />
          </View>
        </TouchableOpacity>
        {subscribedGroups.map((group, index) => (
          <TouchableOpacity
            key={index /* eslint-disable-line react/no-array-index-key */}
            onPress={() => handlePress(group.mainGroupName)}
          >
            <View
              key={group.mainGroupId}
              style={{
                padding: 10,
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Avatar.Text
                labelStyle={{
                  fontSize: 17,
                  fontWeight: 700,
                  fontFamily: 'Nunito',
                  color:
                    selectedGroupValue.mainGroupName === group.mainGroupName
                      ? 'white'
                      : theme.colors.primary,
                }}
                size={48}
                label={
                  group.mainGroupName.length > 3
                    ? group.mainGroupName.charAt(0)
                    : group.mainGroupName
                }
                style={{
                  backgroundColor:
                    selectedGroupValue.mainGroupName === group.mainGroupName
                      ? theme.colors.primary
                      : 'white',
                }}
              />
              <View>
                <Text
                  style={{
                    fontSize: 11,
                    lineHeight: 20,
                    fontWeight: '400',
                    color: '#1F2937',
                  }}
                >
                  {group.mainGroupName}
                </Text>
              </View>

              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  height: 5,
                  width: 50,
                  backgroundColor: 'black',
                  opacity:
                    selectedGroupValue.mainGroupName === group.mainGroupName
                      ? 1
                      : 0,
                  borderRadius: 20,
                }}
              />
            </View>
          </TouchableOpacity>
        ))}
        <View style={{ top: '6%' }}>
          <AddIconInteraction
            iconStyle={{ width: 48, height: 48 }}
            icon={iconImage}
            onPress={() => navigation.navigate('JoinNewGroup')}
          />
        </View>
      </ScrollView>
    </View>
  );
}
