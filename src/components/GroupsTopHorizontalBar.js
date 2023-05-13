import React, { useState, useRef } from 'react';
import { Avatar } from 'react-native-paper';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { theme } from '../constants/myTheme';

export default function GroupsTopBar({ preDefinedGroups }) {
  const [selected, setSelected] = useState('Feed');
  const scrollViewRef = useRef();

  const handlePress = (groupName) => {
    setSelected(groupName);

    // find the index of the selected group
    const groupIndex = preDefinedGroups.findIndex(
      (group) => group.name === groupName
    );

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
                backgroundColor:
                  selected === 'Feed' ? theme.colors.primary : 'white',
              }}
            >
              <Text
                style={{
                  color: selected === 'Feed' ? 'white' : theme.colors.primary,
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
                opacity: selected === 'Feed' ? 1 : 0,
                borderRadius: 20,
              }}
            />
          </View>
        </TouchableOpacity>
        {preDefinedGroups.map((group) => (
          <TouchableOpacity onPress={() => handlePress(group.name)}>
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
                    selected === group.name ? 'white' : theme.colors.primary,
                }}
                size={48}
                label={
                  group.name.length > 3 ? group.name.charAt(0) : group.name
                }
                style={{
                  backgroundColor:
                    selected === group.name ? theme.colors.primary : 'white',
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
                  opacity: selected === group.name ? 1 : 0,
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
