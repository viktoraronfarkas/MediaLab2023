import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native-web';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  selectedGroup,
  selectedSubGroup,
  selectedUser,
  IpAddress,
} from '../redux/features/mainSlice/mainSlice';
// import SubGroupsFilter from '../components/Buttons/SubGroupsFilter';
import BackButton from '../components/Buttons/BackButton';
import iconImage from '../../assets/Icons/plus-icon.png';
import moreMenuIcon from '../../assets/Icons/more-menu-icon.png';
import underlineArrowImage from '../../assets/Images/under-line-arrow-image.png';
import AddIconInteraction from '../components/Buttons/AddIconInteraction';
import EventCard from '../components/Cards/EventCard';
import PostCard from '../components/Cards/PostCard';
import { styles, theme } from '../constants/myTheme';

function JoinedSubgroup() {
  const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.backgroundCamel,
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
    joinContainer: {
      marginTop: '5%',
    },
    postsContainer: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 20,
      paddingBottom: 10,
      padding: 15,
      width: '100%',
    },
    postContainer: {
      marginBottom: 10,
      alignItems: 'center',
      width: '100%',
    },
    eventsMainContainer: { width: '100%', alignItems: 'center' },
    eventsSubContainer: {
      flex: 1,
      flexDirection: 'row',
      marginBottom: 10,
      alignItems: 'center',
      width: '100%',
    },
    eventContainer: {
      flex: 1,
    },
  });

  const navigation = useNavigation();

  const selectedGroupValue = useSelector(selectedGroup);
  const selectedSubGroupValue = useSelector(selectedSubGroup);
  const currentUser = useSelector(selectedUser);
  const clientIpAddress = useSelector(IpAddress);

  const [joined, setJoined] = useState(0);

  const isJoined = () => {
    const url = `http://${clientIpAddress}:3001/user/${currentUser.user_id}/subscribed-groups`;

    axios.get(url).then((res) => {
      setJoined(
        res.data.subGroups.some(
          (el) => el.subgroup_id === selectedSubGroupValue.subgroupId
        )
      );
    });
  };

  const handlePress = () => {};
  isJoined();

  return (
    <SafeAreaView style={style.container}>
      <View style={{ marginLeft: 15, marginTop: 15 }}>
        <BackButton
          text={`back ${selectedGroupValue.mainGroupName}`}
          onPress={() => {
            navigation.goBack(null);
          }}
        />
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View style={style.column}>
          {/* <View style={style.subGroupsFilterContainer}>
            <SubGroupsFilter
              firstFilterLabel="all"
              secondFilterLabel="posts"
              thirdFilterLabel="events"
              disabled
            />
      </View> */}

          <View style={style.headingContainer}>
            <Text style={[styles.headline1, style.headlineStyle]}>
              {selectedSubGroupValue.subgroupName}
            </Text>
            {joined ? (
              <TouchableOpacity style={style.menuIcon}>
                <Image style={style.moreMenuIconImage} source={moreMenuIcon} />
              </TouchableOpacity>
            ) : null}
          </View>
          {joined ? (
            <View style={style.addPostContainer}>
              <View style={style.addPostTextContainer}>
                <Text style={style.addPostText}>add a new post</Text>
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
          ) : (
            <View style={style.joinContainer}>
              <AddIconInteraction
                text="join me!"
                icon={iconImage}
                onPress={handlePress}
              />
            </View>
          )}

          <View style={style.postsContainer}>
            <View style={style.postContainer}>
              <PostCard
                buttonText="Comment"
                title="Computer graphics"
                subTitle="Study Group"
                content="Heyyy, I am searching for a study group for computer graphics :)"
                coverImage={require('../../assets/media.png')}
                iconSource={require('../../assets/Application-of-Computer-Graphics-1.png')}
                disabled
              />
            </View>
            <View style={style.eventsMainContainer}>
              <View style={style.eventsSubContainer}>
                <View style={[style.eventContainer, { marginRight: 10 }]}>
                  <EventCard
                    title="Study session"
                    subTitle="02.04"
                    cardImage={require('../../assets/media.png')}
                    joiningNumber={20}
                    style={{ marginRight: 10 }}
                  />
                </View>
                <View style={style.eventContainer}>
                  <EventCard
                    title="Study session"
                    subTitle="24.04"
                    cardImage={require('../../assets/study.jpeg')}
                    joiningNumber={0}
                    style={{ marginRight: 10 }}
                  />
                </View>
              </View>
            </View>
            <View style={style.postContainer}>
              <PostCard
                buttonText="Comment"
                title="Foodshare"
                subTitle="just comment ;)"
                coverImage={require('../../assets/food.png')}
                iconSource={require('../../assets/foodshare.jpg')}
                disabled
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default JoinedSubgroup;
