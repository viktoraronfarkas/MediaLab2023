import React, { useState } from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import GroupIconContainer from './GroupIconContainer';
import { theme } from '../constants/myTheme';

/**
 * This shows a horizontal List of the Main Groups
 * Multiple groups can be selected.
 *
 * How to Use:
 *  <HorizontalScrollViewBig preDefinedGroups={preDefinedGroups} />
 */
export default function HorizontalScrollViewBig({ preDefinedGroups }) {
  const [selectedNames, setSelectedNames] = useState([]);

  const handleSelectName = (name) => {
    if (selectedNames.includes(name)) {
      setSelectedNames(selectedNames.filter((n) => n !== name));
    } else {
      setSelectedNames([...selectedNames, name]);
    }
  };

  return (
    <View>
      <ScrollView horizontal>
        {preDefinedGroups.map((group) => (
          <TouchableOpacity
            key={group.group_id}
            onPress={() => handleSelectName(group.name)}
            style={{
              padding: 10,
              backgroundColor: selectedNames.includes(group.name)
                ? theme.colors.primary
                : '#FFFFFF00',
              marginRight: 10,
              borderRadius: 5,
            }}
          >
            <GroupIconContainer
              title={group.name}
              imageStyle={{ width: 130, height: 130 }}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
