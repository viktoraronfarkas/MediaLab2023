import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Image, Text, View, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import FullScreenOverlay from '../components/Overlays/FullScreenOverlay';
import iconImage from '../../assets/Icons/plus-icon.png';
import circleLineImage from '../../assets/Images/circleLine-image.png';
import AddIconInteraction from '../components/Buttons/AddIconInteraction';
import BackButton from '../components/Buttons/BackButton';
import TitleCircleHeadingH2 from '../components/Texts/TitleCircleHeading';
import { styles, theme } from '../constants/myTheme';
import {
  setSelectedMainGroup,
  selectedGroup,
  setNewJoinedGroup,
  selectedNewJoinedGroups,
} from '../redux/features/mainSlice/mainSlice';

function JoinGroup() {
  const selectedGroupValue = useSelector(selectedGroup);
  const NewJoinedGroups = useSelector(selectedNewJoinedGroups);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [showOverlay, setShowOverlay] = useState(false);

  const handlePress = () => {
    setShowOverlay(true); // Show the overlay animation
    const isNewlyJoined = NewJoinedGroups.includes(
      selectedGroupValue.mainGroupId
    );

    if (isNewlyJoined) {
      const updatedGroups = NewJoinedGroups.filter(
        (groupId) => groupId !== selectedGroupValue.mainGroupId
      );
      dispatch(setNewJoinedGroup(updatedGroups));
    } else {
      const updatedGroups = [
        ...NewJoinedGroups,
        selectedGroupValue.mainGroupId,
      ];
      dispatch(setNewJoinedGroup(updatedGroups));
      dispatch(setSelectedMainGroup(selectedGroupValue));
      setTimeout(() => {
        // Navigate after a delay to allow the animation to play
        navigation.navigate('JoinNewGroup');
        setShowOverlay(false); // Hide the overlay animation
      }, 2000); // Adjust the delay as per your animation duration
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.backgroundCamel }}
    >
      {showOverlay && (
        <FullScreenOverlay title={Platform.OS === 'android' ? '' : 'Joined'} />
      )}
      {!showOverlay && (
        <View style={{ paddingHorizontal: 25 }}>
          <View style={{ marginTop: 10 }}>
            <BackButton
              text="back"
              onPress={() => {
                navigation.goBack(null);
                dispatch(setSelectedMainGroup(''));
              }}
            />
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View style={{ marginTop: 30 }}>
              <TitleCircleHeadingH2
                title={selectedGroupValue.mainGroupName}
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
                style={[
                  styles.subtitle1,
                  { width: '100%', textAlign: 'center' },
                ]}
              >
                Join the {selectedGroupValue.mainGroupName} group to get all the
                infos about this study programme!
              </Text>
            </View>
            <View
              style={{
                // marginTop: '10%',
                marginTop: 20,
              }}
            >
              <AddIconInteraction
                text="join me!"
                icon={iconImage}
                onPress={handlePress}
              />
            </View>
            {selectedGroupValue.mainGroupTitleImage ? (
              <Image
                style={{ width: 338, height: 338, marginTop: 20 }}
                source={{
                  uri: selectedGroupValue.mainGroupTitleImage.startsWith(
                    'data:image'
                  )
                    ? selectedGroupValue.mainGroupTitleImage
                    : `data:image/png;base64,${selectedGroupValue.mainGroupTitleImage}`,
                }}
              />
            ) : null}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

export default JoinGroup;
