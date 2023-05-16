import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import SmallButtonOrange from './Buttons/SmallButtonOrange';
import SmallButtonGrey from './Buttons/SmallButtonGrey';
import { theme } from '../constants/myTheme';

const createdStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    maxWidth: '90%',
    alignSelf: 'center',
    backgroundColor: theme.colors.neutralsWhite,
    borderRadius: 20,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
});

function Filter({ options, activeButton }) {
  return (
    <View style={createdStyle.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={{ alignItems: 'center', marginLeft: 4, marginRight: 4 }}
        >
          {option === activeButton ? (
            <SmallButtonOrange title={option} paddingVertical={4} />
          ) : (
            <SmallButtonGrey title={option} paddingVertical={4} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default Filter;

// HOW TO USE:
// <Filter options={['posts', 'events']} activeButton="events" />
