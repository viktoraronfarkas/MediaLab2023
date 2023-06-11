import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import DialogAction from '../components/Dialogs/DialogAction';
import OrangeButton from '../components/Buttons/OrangeButton';
import CaptionScribbleHeading from '../components/Texts/CaptionScribbleHeading';
import { styles, theme } from '../constants/myTheme';
import {
  IpAddress,
  setSelectedMainGroup,
  selectedNewJoinedGroups,
  setNewJoinedGroup,
  selectedUserId,
  mainGroups,
  setMainGroups,
} from '../redux/features/mainSlice/mainSlice';
import BackButton from '../components/Buttons/BackButton';
import { AcceptedSvg, RejectedSvg } from '../components/svgs';

const style = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: theme.colors.backgroundSand,
  },
  dialogContainer: {
    position: 'absolute',
    top: '40%',
    left: '10%',
    //  transform: [{ translateX: -150% }, { translateY: -100% }],
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: theme.colors.backgroundSand,
  },
});

export default function JoinNewGroup() {
  const [subscribedGroups, setSubscribedGroups] = useState([]);
  const clientIpAddress = useSelector(IpAddress);
  const NewJoinedGroups = useSelector(selectedNewJoinedGroups);
  const [showDialog, setShowDialog] = useState(false);
  const [rejectedGroups, setRejectedGroups] = useState([]);
  const currentSelectedUserId = useSelector(selectedUserId);
  const fetechedMainGroups = useSelector(mainGroups);

  const dispatch = useDispatch();
  // navigate to REGISTRATION Screen
  const navigation = useNavigation();

  useEffect(() => {
    const fetchSubscribedGroups = async () => {
      try {
        const response = await axios.get(
          `http://${clientIpAddress}:3001/user/${currentSelectedUserId}/subscribed-groups`
        );
        // eslint-disable-next-line no-shadow
        const { mainGroups } = response.data;
        setSubscribedGroups(mainGroups || []); // Ensure initialization with an empty array if data is undefined
      } catch (error) {
        console.error('Error retrieving subscribed groups:', error);
        // Handle the error
      }
    };

    const fetchMainGroups = async () => {
      try {
        const response = await axios.get(
          `http://${clientIpAddress}:3001/maingroup`
        );
        const mainGroupsData = response.data.map((mainGroup) => ({
          ...mainGroup,
          mainGroupTitleImage: mainGroup.mainGroupTitleImage
            ? `data:image/png;base64,${mainGroup.mainGroupTitleImage}`
            : null,
        }));
        dispatch(setMainGroups(mainGroupsData || {}));
      } catch (error) {
        console.error('Error retrieving main groups:', error);
        // Handle the error
      }
    };

    fetchSubscribedGroups();
    fetchMainGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSelectedUserId]);

  const unjoinedGroups = fetechedMainGroups.filter(
    (mainGroup) =>
      !subscribedGroups.some(
        (group) => group.main_group_id === mainGroup.mainGroupId
      )
  );

  console.log(fetechedMainGroups);
  console.log(unjoinedGroups);
  console.log(subscribedGroups);

  function handlePress(selectedMainGroup) {
    const isNewlyJoined = NewJoinedGroups.includes(
      selectedMainGroup.mainGroupId
    );

    if (isNewlyJoined) {
      const updatedGroups = NewJoinedGroups.filter(
        (groupId) => groupId !== selectedMainGroup.mainGroupId
      );
      dispatch(setNewJoinedGroup(updatedGroups));
      setRejectedGroups([...rejectedGroups, selectedMainGroup.mainGroupId]);

      // Simulate the transition by setting a timeout to remove the group from the rejectedGroups after a short delay
      setTimeout(() => {
        setRejectedGroups(
          rejectedGroups.filter(
            (groupId) => groupId !== selectedMainGroup.mainGroupId
          )
        );
      }, 500);
    } else {
      navigation.navigate('JoinGroupScreen');
      dispatch(setSelectedMainGroup(selectedMainGroup));
    }
  }

  const handleDone = async () => {
    if (NewJoinedGroups.length > 0) {
      try {
        const mainGroupIds = [...NewJoinedGroups];

        // Make the POST request for adding the user to the selected groups
        const response = await axios.post(
          `http://${clientIpAddress}:3001/user/subscribe/maingroup`,
          {
            userId: currentSelectedUserId,
            mainGroupIds,
          }
        );

        const { message } = response.data;
        console.log(message); // Optional: Display success message
        navigation.navigate('MainScreen');
        // Clear the selected groups and navigate back to the group list
        dispatch(setSelectedMainGroup(''));
        dispatch(setNewJoinedGroup([]));
        // navigation.navigate('GroupListScreen');
      } catch (error) {
        console.error(
          'Subscribe to main groups error:',
          error.response?.data?.message || error.message
        );
        // Handle the error response
      }
    }
  };

  const handleBackButtonPress = () => {
    if (NewJoinedGroups.length > 0) {
      setShowDialog(true);
    } else {
      navigation.navigate('MainScreen');
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <View>
        <View style={{ marginTop: 10, paddingHorizontal: 25 }}>
          <BackButton
            text="back"
            onPress={() => {
              handleBackButtonPress();
            }}
          />
        </View>
        <ScrollView style={{ marginTop: 20 }}>
          <DialogAction
            visible={showDialog}
            text="Nothing saved yet! Your added groups will be lost. Continue?"
            actions={[
              {
                id: 1,
                text: 'Continue',
                onPress: () => {
                  setShowDialog(false);
                  dispatch(setSelectedMainGroup(''));
                  dispatch(setNewJoinedGroup([]));
                  navigation.navigate('MainScreen');
                },
              },
              { id: 2, text: 'Cancel', onPress: () => setShowDialog(false) },
            ]}
            containerStyle={style.dialogContainer}
          />
          <View>
            <View style={{ paddingHorizontal: 25 }}>
              <CaptionScribbleHeading
                subHeading="Join new ?"
                title="New Groups To Join : "
                headlineStyle={{ width: '100%' }}
              />
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {unjoinedGroups.map((group) => {
                const isNewlyJoined = NewJoinedGroups.includes(
                  group.mainGroupId
                );
                const isRejected = rejectedGroups.includes(group.mainGroupId);

                return (
                  <TouchableOpacity
                    key={group.mainGroupId}
                    onPress={() => handlePress(group)}
                  >
                    <View
                      key={group.mainGroupId}
                      style={{
                        padding: 10,
                        position: 'relative',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {isNewlyJoined && !isRejected && <AcceptedSvg />}
                      {isRejected && <RejectedSvg />}
                      {!isNewlyJoined && !isRejected && (
                        <Avatar.Text
                          tyle={styles.subtitle1}
                          labelStyle={{
                            fontSize: 30,
                            fontWeight: 700,
                            // fontFamily: 'Nunito',
                            color: NewJoinedGroups.includes(group.mainGroupId)
                              ? 'white'
                              : theme.colors.primary,
                          }}
                          size={100}
                          label={
                            group.mainGroupName.length > 3
                              ? group.mainGroupName.charAt(0)
                              : group.mainGroupName
                          }
                          style={{
                            backgroundColor: NewJoinedGroups.includes(
                              group.mainGroupId
                            )
                              ? theme.colors.primary
                              : 'white',
                          }}
                        />
                      )}
                      <View>
                        <Text
                          style={[
                            styles.subtitle1,
                            {
                              fontWeight: '400',
                              color: '#1F2937',
                              marginTop: 5,
                            },
                          ]}
                        >
                          {group.mainGroupName}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <View style={{ paddingHorizontal: 25 }}>
              <OrangeButton
                text="Done"
                onPress={() => handleDone()}
                styleButton={{
                  alignSelf: 'center',
                  width: '100%',
                  marginTop: 40,
                  opacity: NewJoinedGroups.length > 0 ? 1 : 0.5,
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
