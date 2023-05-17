import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { theme } from '../../constants/myTheme';

function SubGroupsFilter({
  firstFilterLabel,
  secondFilterLabel,
  thirdFilterLabel,
}) {
  const [selected, setSelected] = useState(firstFilterLabel);

  return (
    <View
      style={{
        backgroundColor: 'white',
        flexDirection: 'row',
        borderRadius: 12,
        justifyContent: 'center',
        alignContent: 'center',
        width: '80%',
        padding: '2%',
      }}
    >
      <View
        style={{
          marginLeft: '3%',
          marginRight: '3%',
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor:
              selected === firstFilterLabel
                ? theme.colors.primary
                : theme.colors.backgroundCamel,
            borderColor:
              selected === firstFilterLabel
                ? theme.colors.primary
                : theme.colors.backgroundCamel,
            justifyContent: 'center', // align text vertically
            alignItems: 'center', // align text horizontally
            width: 88,
            height: 30,
            borderRadius: 12,
          }}
          onPress={() => setSelected(firstFilterLabel)}
        >
          <Text
            style={{
              textAlign: 'center',
              color:
                selected === firstFilterLabel
                  ? '#fff'
                  : theme.colors.neutralsGrey800,
            }}
          >
            {firstFilterLabel}
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={{
            backgroundColor:
              selected === secondFilterLabel
                ? theme.colors.primary
                : theme.colors.backgroundCamel,
            borderColor:
              selected === secondFilterLabel
                ? theme.colors.primary
                : theme.colors.backgroundCamel,
            justifyContent: 'center',
            alignItems: 'center',
            width: 88,
            height: 30,
            borderRadius: 12,
          }}
          onPress={() => setSelected(secondFilterLabel)}
        >
          <Text
            style={{
              textAlign: 'center',
              color:
                selected === secondFilterLabel
                  ? '#fff'
                  : theme.colors.neutralsGrey800,
            }}
          >
            {secondFilterLabel}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginLeft: '3%',
          marginRight: '3%',
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor:
              selected === thirdFilterLabel
                ? theme.colors.primary
                : theme.colors.backgroundCamel,
            borderColor:
              selected === thirdFilterLabel
                ? theme.colors.primary
                : theme.colors.backgroundCamel,
            justifyContent: 'center',
            alignItems: 'center',
            width: 88,
            height: 30,
            borderRadius: 12,
          }}
          onPress={() => setSelected(thirdFilterLabel)}
        >
          <Text
            style={{
              textAlign: 'center',
              color:
                selected === thirdFilterLabel
                  ? '#fff'
                  : theme.colors.neutralsGrey800,
            }}
          >
            {thirdFilterLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SubGroupsFilter;
