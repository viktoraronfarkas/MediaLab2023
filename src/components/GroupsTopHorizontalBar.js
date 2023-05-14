import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { theme } from '../constants/myTheme';
import {
  actionExample,
  selectedGroup,
} from '../redux/features/mainSlice/mainSlice';

function GroupsTopBar({ preDefinedGroups }) {
  const value = useSelector(selectedGroup);

  const dispatch = useDispatch();

  // navigate to REGISTRATION Screen
  const navigation = useNavigation();

  const scrollViewRef = useRef();

  const handlePress = (groupName) => {
    const groupIndex = preDefinedGroups.findIndex(
      (group) => group.main_group_name === groupName
    );

    const group = preDefinedGroups[groupIndex];

    if (groupName !== 'Feed') {
      dispatch(actionExample(group));
      navigation.navigate('JoinGroupScreen');
    } else {
      dispatch(actionExample(''));
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
                backgroundColor: !value.name ? theme.colors.primary : 'white',
              }}
            >
              <Text
                style={{
                  color: !value.name ? 'white' : theme.colors.primary,
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
                opacity: !value.name ? 1 : 0,
                borderRadius: 20,
              }}
            />
          </View>
        </TouchableOpacity>
        {preDefinedGroups.map((group) => (
          <TouchableOpacity onPress={() => handlePress(group.main_group_name)}>
            <View
              key={group.main_group_id}
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
                    value.name === group.main_group_name
                      ? 'white'
                      : theme.colors.primary,
                }}
                size={48}
                label={
                  group.main_group_name.length > 3
                    ? group.main_group_name.charAt(0)
                    : group.main_group_name
                }
                style={{
                  backgroundColor:
                    value.name === group.main_group_name
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
                  {group.main_group_name}
                </Text>
              </View>

              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  height: 5,
                  width: 50,
                  backgroundColor: 'black',
                  opacity: value.name === group.main_group_name ? 1 : 0,
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

export default GroupsTopBar;
