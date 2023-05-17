import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // Import the axios library
import React from 'react';
import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import iconImage from '../../assets/Icons/plus-icon.png';
import circleLineImage from '../../assets/Images/circleLine-image.png';
import AddIconInteraction from '../components/Buttons/AddIconInteraction';
import BackButton from '../components/Buttons/BackButton';
import TitleCircleHeadingH2 from '../components/Texts/TitleCircleHeading';
import { styles, theme } from '../constants/myTheme';
import {
  actionExample,
  selectedGroup,
  selectedUser,
  IpAddress,
} from '../redux/features/mainSlice/mainSlice';

function JoinGroup() {
  const value = useSelector(selectedGroup);
  const currentUser = useSelector(selectedUser);
  const clientIpAddress = useSelector(IpAddress);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handlePress = async () => {
    try {
      // Make a POST request to the API endpoint
      const response = await axios.post(
        `http://${clientIpAddress}:3001/user/subscribe/maingroup`,
        {
          userId: currentUser.user_id, // Replace with the actual user ID
          mainGroupIds: [value.mainGroupId], // Pass the main group ID as an array
        }
      );

      const { message } = response.data;
      console.log(message); // Optional: Display success message

      // TODO: Handle the success response and perform necessary actions
      // Redirect to the main screen or any other screen in your app
      navigation.navigate('MainScreen');
    } catch (error) {
      console.error(
        'Subscribe to main groups error:',
        error.response?.data?.message || error.message
      );
      // Handle the error response
    }
  };

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
            title={value.mainGroupName}
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
            Join the {value.mainGroupName} group to get all the infos about this
            study programme!
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
