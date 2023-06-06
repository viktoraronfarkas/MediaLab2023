import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { ActivityIndicator } from 'react-native-paper';

import {
  selectedGroup,
  selectedSubGroup,
  IpAddress,
  setPosts,
  posts,
  selectedUserId,
  SetSelectedSubGroup,
  setMainGroups,
  setSelectedMainGroup,
} from '../redux/features/mainSlice/mainSlice';
// import SubGroupsFilter from '../components/Buttons/SubGroupsFilter';
import BackButton from '../components/Buttons/BackButton';
import iconImage from '../../assets/Icons/plus-icon.png';
import { MoreSvg } from '../components/svgs';
import underlineArrowImage from '../../assets/Images/under-line-arrow-image.png';
import AddIconInteraction from '../components/Buttons/AddIconInteraction';
import PostCard from '../components/Cards/PostCard';
import { styles, theme } from '../constants/myTheme';
import useFetchUserData from '../routes/hooks/useFetchPosts';
import BottomScrollSheet from '../components/BottomScrollSheet/BottomScrollSheet';
import OptionsLeaveGroupSheet from '../components/BottomScrollSheet/OptionsLeaveGroupSheet';

function Subgroup({ route }) {
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
      width: 205,
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
      marginTop: 50,
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
    overlay: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const fetchedPosts = useFetchUserData();
  const [loading, setLoading] = useState(true); // Add loading state

  const selectedGroupValue = useSelector(selectedGroup);
  const selectedSubGroupValue = useSelector(selectedSubGroup);
  // const currentUser = useSelector(selectedUser);
  const clientIpAddress = useSelector(IpAddress);
  let storedPosts = useSelector(posts);
  const currentSelectedUserId = useSelector(selectedUserId);
  const refRBSheet = useRef();

  const [joined, setJoined] = useState(0);

  const isJoined = () => {
    const url = `http://${clientIpAddress}:3001/user/${currentSelectedUserId}/subscribed-groups`;

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
      userId: currentSelectedUserId,
      subgroupId: selectedSubGroupValue.subgroupId,
      mainGroupId: selectedGroupValue.mainGroupId,
    };

    axios
      .post(url, data)
      .then(() => setJoined(true))
      .catch((err) => console.error(err));
  };

  const unsubscribeFromSubGroup = () => {
    const url = `http://${clientIpAddress}:3001/user/${currentSelectedUserId}/unsubscribe/subgroup`;
    const data = {
      userId: currentSelectedUserId,
      subGroupId: selectedSubGroupValue.subgroupId,
    };

    axios
      .post(url, data)
      .then(() => {
        setJoined(false);
        refRBSheet.current.close();
      })
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
    if (route.params && route.params.createdGroupId) {
      try {
        // fetch main groups again
        axios
          .get(`http://${clientIpAddress}:3001/maingroup`)
          .then((response) => {
            const mainGroupsData = response.data;
            dispatch(setMainGroups(mainGroupsData));

            // set updated main group in store
            const updatedGroupValue = mainGroupsData.filter(
              (item) => item.mainGroupId === selectedGroupValue.mainGroupId
            );
            dispatch(setSelectedMainGroup(updatedGroupValue[0]));

            // update subgroup in store
            const createdGroup = updatedGroupValue[0].subgroups.filter(
              (item) => item.subgroupId === route.params.createdGroupId
            );
            dispatch(SetSelectedSubGroup(createdGroup[0]));
          });
      } catch (error) {
        console.error('Error fetching main groups:', error);
      }
    }
  }, [route]);

  useEffect(() => {
    if (
      route.params &&
      route.params.createdGroupId &&
      selectedSubGroupValue.subgroupId
    ) {
      // refresh page, loading and joining new subgroup
      joinSubgroup();
      navigation.navigate('Subgroup');
    }
  }, [route, selectedSubGroupValue.subgroupId]);

  useEffect(() => {
    isJoined();
  }, []);

  useEffect(() => {
    dispatch(setPosts(fetchedPosts));
  }, [dispatch, fetchedPosts]);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true); // Set loading to true before fetching data

      // Fetch user data using axios or any other method
      const response = await axios.get(
        `http://${clientIpAddress}:3001/subgroup/${selectedSubGroupValue.subgroupId}/posts`
      );
      const fetchedUserData = response.data;
      dispatch(setPosts(fetchedUserData));

      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false); // Set loading to false in case of error
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );

  if (Object.keys(storedPosts).length === 0) {
    storedPosts = [];
  }

  return (
    <SafeAreaView style={style.container}>
      <View style={{ position: 'relative', flex: 1 }}>
        <View style={{ marginLeft: 15, marginTop: 15 }}>
          <BackButton
            text={`back ${selectedGroupValue.mainGroupName}`}
            onPress={() => {
              navigation.navigate('MainScreen');
            }}
          />
        </View>
        <BottomScrollSheet
          bottomSheetRef={refRBSheet}
          contentComponent={
            <OptionsLeaveGroupSheet
              sheetTitle={`Leave ${selectedSubGroupValue.subgroupName} Group?`}
              leaveText="Yes"
              cancelText="Nevermind"
              onCancel={() => {
                refRBSheet.current.close(); // Close the bottom sheet
              }}
              onLeave={() => {
                unsubscribeFromSubGroup();
              }}
            />
          }
        />
        <ScrollView style={{ flex: 1 }}>
          <View style={style.column}>
            <View style={style.headingContainer}>
              <Text style={[styles.headline1, style.headlineStyle]}>
                {selectedSubGroupValue.subgroupName}
              </Text>
              {joined ? (
                <TouchableOpacity
                  style={{ position: 'absolute', left: '85%', top: '-10%' }}
                  onPress={() => refRBSheet.current.open()}
                >
                  <MoreSvg color="#000" width={50} height={50} />
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
                {storedPosts
                  .slice() // Create a copy of the array
                  .sort((a, b) => b.timestamp - a.timestamp) // Sort the copied array in descending order based on timestamp
                  .reverse() // Reverse the sorted array to display the most recent post at the top
                  .map((post, index) => (
                    <PostCard
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
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
        {loading && (
          <View style={style.overlay}>
            <ActivityIndicator animating color={theme.colors.primary} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

export default Subgroup;
