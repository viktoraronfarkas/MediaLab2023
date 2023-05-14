import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectedGroup } from '../redux/features/mainSlice/mainSlice';
import TitleCircleHeadingH2 from './Texts/TitleCircleHeading';
import circleLineImage from '../../assets/Images/circleLine-image.png';
import SubGroupsFilter from './Buttons/SubGroupsFilter';

function MainJoinedGroup() {
  const value = useSelector(selectedGroup);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '6%',
      }}
    >
      <View>
        <TitleCircleHeadingH2
          title={value.name}
          image={circleLineImage}
          lineStyle={{
            height: 70,
            width: 200,
          }}
        />
      </View>

      <View style={{ width: '80%', marginTop: '10%' }}>
        <SubGroupsFilter />
      </View>
    </View>
  );
}

export default MainJoinedGroup;
