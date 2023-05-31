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
  const selectedGroupvalue = useSelector(selectedGroup);
  const NewJoinedGroups = useSelector(selectedNewJoinedGroups);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [showOverlay, setShowOverlay] = useState(false);
  const [mainGroupImage, setMainGroupImage] = useState(null); // State to store the main group image

  useEffect(() => {
    const fetchMainGroupImage = async () => {
      try {
        // Replace the `fetchImageData` function with your own logic to retrieve the image data from the database
        const imageData = selectedGroupvalue.mainGroupTitleImage;

        // Convert Blob to Base64 string
        const blobImage = await fetch(imageData);
        const base64Image = await blobImage
          .blob()
          .then((blob) => URL.createObjectURL(blob));

        setMainGroupImage(base64Image);
      } catch (error) {
        console.error('Error fetching main group image:', error);
      }
    };

    fetchMainGroupImage();
  }, [selectedGroupvalue.mainGroupTitleImage]);

  const handlePress = () => {
    setShowOverlay(true); // Show the overlay animation
    const isNewlyJoined = NewJoinedGroups.includes(
      selectedGroupvalue.mainGroupId
    );

    if (isNewlyJoined) {
      const updatedGroups = NewJoinedGroups.filter(
        (groupId) => groupId !== selectedGroupvalue.mainGroupId
      );
      dispatch(setNewJoinedGroup(updatedGroups));
    } else {
      const updatedGroups = [
        ...NewJoinedGroups,
        selectedGroupvalue.mainGroupId,
      ];
      dispatch(setNewJoinedGroup(updatedGroups));
      dispatch(setSelectedMainGroup(selectedGroupvalue));
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
                title={selectedGroupvalue.mainGroupName}
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
                Join the {selectedGroupvalue.mainGroupName} group to get all the
                infos about this study programme!
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
            {mainGroupImage && (
              <Image
                style={{ width: 338, height: 338 }}
                source={{ uri: mainGroupImage }}
              />
            )}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

export default JoinGroup;
