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
import { ActivityIndicator, Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import OrangeButton from '../../../components/Buttons/OrangeButton';
import CaptionScribbleHeading from '../../../components/Texts/CaptionScribbleHeading';
import { AcceptedSvg, RejectedSvg } from '../../../components/svgs';
import { theme } from '../../../constants/myTheme';
import {
  IpAddress,
  selectedNewJoinedGroups,
  setNewJoinedGroup,
} from '../../../redux/features/mainSlice/mainSlice';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: theme.colors.backgroundSand,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function RegistrationPageThreeView({ handleSubmit, loading }) {
  const [allMainGroups, setMainGroups] = useState([]);
  const clientIpAddress = useSelector(IpAddress);
  // const currentUser = useSelector(selectedUser);
  const NewJoinedGroups = useSelector(selectedNewJoinedGroups);
  const [rejectedGroups, setRejectedGroups] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMainGroups = async () => {
      try {
        const response = await axios.get(
          `http://${clientIpAddress}:3001/maingroup`
        );
        const mainGroupsData = response.data;
        setMainGroups(mainGroupsData || []); // Ensure initialization with an empty array if data is undefined
      } catch (error) {
        console.error('Error retrieving main groups:', error);
        // Handle the error
      }
    };
    fetchMainGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      const updatedGroups = [...NewJoinedGroups, selectedMainGroup.mainGroupId];
      dispatch(setNewJoinedGroup(updatedGroups));
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator animating color={theme.colors.primary} />
        </View>
      )}
      <ScrollView>
        <View style={{ paddingHorizontal: 25 }}>
          <CaptionScribbleHeading
            subHeading="Click down below to add groups:"
            title="Before you’re good to go, here are some groups you can join right away:"
            headlineStyle={{ width: 300 }}
          />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {allMainGroups.map((group) => {
              const isNewlyJoined = NewJoinedGroups.includes(group.mainGroupId);
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

          <OrangeButton
            text="Finish"
            onPress={handleSubmit}
            styleButton={{ alignSelf: 'center', width: '100%' }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
