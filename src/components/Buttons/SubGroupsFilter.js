import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { theme } from '../../constants/myTheme';

function SubGroupsFilter({
  firstFilterLabel,
  secondFilterLabel,
  thirdFilterLabel,
  disabled,
  onFilterChange,
  selectedValue,
}) {
  const [selected, setSelected] = useState(disabled ? '' : selectedValue);

  const handleFilterChange = (filter) => {
    if (disabled) {
      return;
    }
    setSelected(filter);
    onFilterChange(filter);
  };

  const getButtonStyles = (filterLabel) => {
    if (disabled) {
      return {
        backgroundColor: theme.colors.neutralsGrey500,
        borderColor: theme.colors.neutralsGrey500,
        opacity: 0.5,
      };
    }
    if (selected === filterLabel) {
      return {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
      };
    }
    return {
      backgroundColor: theme.colors.backgroundCamel,
      borderColor: theme.colors.backgroundCamel,
    };
  };

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
            justifyContent: 'center', // align text vertically
            alignItems: 'center', // align text horizontally
            width: 88,
            height: 30,
            borderRadius: 12,
            ...getButtonStyles(firstFilterLabel),
          }}
          onPress={() => handleFilterChange(firstFilterLabel)}
          disabled={disabled}
        >
          <Text
            style={{
              textAlign: 'center',
              color:
                selected === firstFilterLabel || disabled
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
            justifyContent: 'center',
            alignItems: 'center',
            width: 88,
            height: 30,
            borderRadius: 12,
            ...getButtonStyles(secondFilterLabel),
          }}
          onPress={() => handleFilterChange(secondFilterLabel)}
          disabled={disabled}
        >
          <Text
            style={{
              textAlign: 'center',
              color:
                selected === secondFilterLabel || disabled
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
            justifyContent: 'center',
            alignItems: 'center',
            width: 88,
            height: 30,
            borderRadius: 12,
            ...getButtonStyles(thirdFilterLabel),
          }}
          onPress={() => handleFilterChange(thirdFilterLabel)}
          disabled={disabled}
        >
          <Text
            style={{
              textAlign: 'center',
              color:
                selected === thirdFilterLabel || disabled
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
