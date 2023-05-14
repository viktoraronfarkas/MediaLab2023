import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { useSelector } from 'react-redux';
import circleLineImage from '../../assets/Images/circleLine-image.png';
import { selectedGroup } from '../redux/features/mainSlice/mainSlice';
import SubGroupsFilter from './Buttons/SubGroupsFilter';
import TitleCircleHeadingH2 from './Texts/TitleCircleHeading';
import ListItem from './Items/ListItem';
import iconImage from '../../assets/Icons/plus-icon.png';
import moreMenuIcon from '../../assets/Icons/more-menu-icon.png';
import underlineArrowImage from '../../assets/Images/under-line-arrow-image.png';
import { styles } from '../constants/myTheme';

function MainJoinedGroup() {
  const value = useSelector(selectedGroup);
  const handlePress = () => {};

  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View style={{ position: 'relative' }}>
        <TitleCircleHeadingH2
          title={value.name}
          image={circleLineImage}
          lineStyle={{
            height: 70,
            width: 200,
          }}
        />
        <TouchableOpacity
          style={{ position: 'absolute', left: '44%', top: '50%' }}
        >
          <Image
            style={{
              height: 20,
              width: 5,
            }}
            source={moreMenuIcon}
          />
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
          fourthFilterLabel="joined"
          thirdFilterLabel="unjoined"
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
          border: '1px solid black',
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
            left: '82%',
            top: '-20%',
            position: 'absolute',
          }}
        >
          <TouchableOpacity onPress={handlePress}>
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
        {value.subgroups.map((subgroup, index) => (
          <ListItem
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            mainTitle={subgroup.name}
            subtitle={subgroup.subTitle}
            iconImage={require('../../assets/Icons/arrow-right.png')}
            onPress={handlePress}
          />
        ))}
      </View>
    </View>
  );
}

export default MainJoinedGroup;
