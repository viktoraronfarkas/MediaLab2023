import React, { useState, useEffect } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native-web';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  selectedGroup,
  selectedSubGroup,
  selectedUser,
  IpAddress,
  setPosts,
  posts,
} from '../redux/features/mainSlice/mainSlice';
// import SubGroupsFilter from '../components/Buttons/SubGroupsFilter';
import BackButton from '../components/Buttons/BackButton';
import iconImage from '../../assets/Icons/plus-icon.png';
import moreMenuIcon from '../../assets/Icons/more-menu-icon.png';
import underlineArrowImage from '../../assets/Images/under-line-arrow-image.png';
import AddIconInteraction from '../components/Buttons/AddIconInteraction';
import PostCard from '../components/Cards/PostCard';
import { styles, theme } from '../constants/myTheme';
import useFetchPosts from '../routes/hooks/useFetchPosts';

function Subgroup() {
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
  const dispatch = useDispatch();

  const fetchedPosts = useFetchPosts();

  const selectedGroupValue = useSelector(selectedGroup);
  const selectedSubGroupValue = useSelector(selectedSubGroup);
  const currentUser = useSelector(selectedUser);
  const clientIpAddress = useSelector(IpAddress);
  let storedPosts = useSelector(posts);

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

  const joinSubgroup = () => {
    const url = `http://${clientIpAddress}:3001/user/subscribe/subgroup`;
    const data = {
      userId: currentUser.user_id,
      subgroupId: selectedSubGroupValue.subgroupId,
      mainGroupId: selectedGroupValue.mainGroupId,
    };

    axios
      .post(url, data)
      .then(() => setJoined(true))
      .catch((err) => console.error(err));
  };

  const handlePress = () => {
    if (!joined) {
      joinSubgroup();
    } else {
      navigation.navigate('addPost');
    }
  };

  useEffect(() => {
    isJoined();
  }, []);

  useEffect(() => {
    dispatch(setPosts(fetchedPosts));
  }, [dispatch, fetchedPosts]);

  if (Object.keys(storedPosts).length === 0) {
    storedPosts = [];
  }

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
              {storedPosts.map((post) => (
                <PostCard
                  title={post.heading}
                  subTitle={post.caption}
                  content={post.text}
                  coverImage={require('../../assets/media.png')}
                  iconSource={require('../../assets/Application-of-Computer-Graphics-1.png')}
                  disabled
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Subgroup;
