import React from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { theme, styles } from '../constants/myTheme';

import TitleCircleHeadingH2 from '../components/Texts/TitleCircleHeading';
import circleLineImage from '../../assets/Images/circleLine-image.png';
import AddIconInteraction from '../components/Buttons/AddIconInteraction';
import iconImage from '../../assets/Icons/plus-icon.png';
import BackButton from '../components/Buttons/BackButton';
import {
  actionExample,
  selectedGroup,
} from '../redux/features/mainSlice/mainSlice';

function JoinGroup() {
  const value = useSelector(selectedGroup);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handlePress = () => {};

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.backgroundCamel }}
    >
      <BackButton
        text="back"
        onPress={() => {
          navigation.goBack(null);
          dispatch(actionExample(''));
        }}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
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

        <View
          style={{
            marginTop: '10%',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Text
            style={[styles.subtitle1, { width: '90%', textAlign: 'center' }]}
          >
            Join the {value.name} group to get all the infos about this study
            programme!
          </Text>
        </View>
        <View
          style={
            {
              // marginTop: '10%',
            }
          }
        >
          <AddIconInteraction
            text="join me!"
            icon={iconImage}
            onPress={handlePress}
          />
        </View>
        <View
          style={
            {
              // marginTop: '10%',
            }
          }
        >
          <Image
            style={{ width: 338, height: 338 }}
            source={require('../../assets/Images/join-group.png')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default JoinGroup;
