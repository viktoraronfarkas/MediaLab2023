import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSelector } from 'react-redux';
import { StyleSheet } from 'react-native-web';
import { useNavigation } from '@react-navigation/native';
import {
  selectedGroup,
  selectedSupGroup,
} from '../redux/features/mainSlice/mainSlice';
import SubGroupsFilter from '../components/Buttons/SubGroupsFilter';
import BackButton from '../components/Buttons/BackButton';
import iconImage from '../../assets/Icons/plus-icon.png';
import moreMenuIcon from '../../assets/Icons/more-menu-icon.png';
import underlineArrowImage from '../../assets/Images/under-line-arrow-image.png';
import { styles, theme } from '../constants/myTheme';

function JoinedSubgroup() {
  const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.backgroundSand,
    },
    column: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    subGroupsFilterContainer: {
      width: '100%',
      marginTop: '10%',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    headingContainer: {
      position: 'relative',
      width: '100%',
      justifyContent: 'center',
      marginTop: '5%',
      flexDirection: 'row',
    },
    headlineStyle: {
      textAlign: 'center',
      width: '50%',
    },
    menuIcon: {
      position: 'absolute',
      left: '90%',
      top: '40%',
    },
    menuIconImage: {
      width: 5,
      height: 20,
    },
    addPostContainer: {
      flexDirection: 'row',
      marginTop: '8%',
      width: '100%',
    },
    addPostTextContainer: {
      position: 'relative',
      width: '100%',
    },
    addPostText: {
      ...styles.headline3,
      textAlign: 'center',
    },
    underlineArrowImage: {
      left: '30%',
      top: '90%',
      height: 50,
      width: 200,
      position: 'absolute',
    },
    addIconContainer: {
      left: '85%',
      top: '-20%',
      position: 'absolute',
    },
    addIconImage: {
      width: 48,
      height: 48,
    },
    postsContainer: {
      width: '100%',
      flexDirection: 'column',
      marginTop: '20%',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    postContainer: {
      width: '100%',
      padding: '3%',
    },
  });

  const navigation = useNavigation();

  const selectedGroupValue = useSelector(selectedGroup);
  const selectedSubGroupValue = useSelector(selectedSupGroup);

  const handlePress = () => {};

  return (
    <SafeAreaView style={style.container}>
      <BackButton
        text={`back ${selectedGroupValue.name}`}
        onPress={() => {
          navigation.goBack(null);
        }}
      />
      <View style={style.column}>
        <View style={style.subGroupsFilterContainer}>
          <SubGroupsFilter
            firstFilterLabel="all"
            secondFilterLabel="posts"
            thirdFilterLabel="events"
          />
        </View>
        <View style={style.headingContainer}>
          <Text style={[styles.headline1, style.headlineStyle]}>
            {selectedSubGroupValue.name}
          </Text>

          <TouchableOpacity style={style.menuIcon}>
            <Image style={style.moreMenuIconImage} source={moreMenuIcon} />
          </TouchableOpacity>
        </View>
        <View style={style.addPostContainer}>
          <View style={style.addPostTextContainer}>
            <Text style={style.addPostText}>add a new post or event</Text>
            <Image
              style={style.underlineArrowImage}
              source={underlineArrowImage}
            />
          </View>

          <View style={style.addIconContainer}>
            <TouchableOpacity onPress={handlePress}>
              <Image source={iconImage} style={style.addIconImage} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default JoinedSubgroup;
