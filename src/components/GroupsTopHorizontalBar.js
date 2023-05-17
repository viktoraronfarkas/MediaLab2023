import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { theme } from '../constants/myTheme';
import {
  setSelectedMainGroup,
  selectedGroup,
} from '../redux/features/mainSlice/mainSlice';

export default function GroupsTopBar({ preDefinedGroups }) {
  const selectedGroupValue = useSelector(selectedGroup);

  const dispatch = useDispatch();

  // navigate to REGISTRATION Screen
  const navigation = useNavigation();

  const scrollViewRef = useRef();

  const handlePress = (groupName) => {
    const groupIndex = preDefinedGroups.findIndex(
      (group) => group.name === groupName
    );

    const group = preDefinedGroups[groupIndex];

    if (groupName !== 'Feed') {
      dispatch(setSelectedMainGroup(group));
      navigation.navigate('JoinGroupScreen');
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
        style={{ flexGrow: 0, backgroundColor: theme.colors.backgroundSand }}
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
                backgroundColor: !selectedGroupValue.name
                  ? theme.colors.primary
                  : 'white',
              }}
            >
              <Text
                style={{
                  color: !selectedGroupValue.name
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
                opacity: !selectedGroupValue.name ? 1 : 0,
                borderRadius: 20,
              }}
            />
          </View>
        </TouchableOpacity>
        {preDefinedGroups.map((group, index) => (
          <TouchableOpacity
            key={index /* eslint-disable-line react/no-array-index-key */}
            onPress={() => handlePress(group.name)}
          >
            <View
              key={group.group_id}
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
                    selectedGroupValue.name === group.name
                      ? 'white'
                      : theme.colors.primary,
                }}
                size={48}
                label={
                  group.name.length > 3 ? group.name.charAt(0) : group.name
                }
                style={{
                  backgroundColor:
                    selectedGroupValue.name === group.name
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
                  {group.name}
                </Text>
              </View>

              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  height: 5,
                  width: 50,
                  backgroundColor: 'black',
                  opacity: selectedGroupValue.name === group.name ? 1 : 0,
                  borderRadius: 20,
                }}
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
