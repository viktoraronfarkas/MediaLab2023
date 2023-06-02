import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  // Image,
  // TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
// import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import InputField from '../components/Items/InputField';
import { styles, theme } from '../constants/myTheme';
import OrangeButton from '../components/Buttons/OrangeButton';
// import CaptionScribbleHeading from '../components/Texts/CaptionScribbleHeading';
// import UploadIcon from '../../assets/Icons/upload-icon.png';
// import GlitterImage from '../../assets/Images/glitter-image.png';
// import BackButton from '../components/Buttons/BackButton';
// import Filter from '../components/Filter';
import {
  selectedSubGroup,
  selectedUser,
  IpAddress,
} from '../redux/features/mainSlice/mainSlice';

function AddPost() {
  const navigation = useNavigation();
  const currentGroup = useSelector(selectedSubGroup);
  const clientIpAddress = useSelector(IpAddress);
  const currentUser = useSelector(selectedUser);

  // const [postImg, setImg] = useState('');
  const [postHeading, setHeading] = useState('');
  const [postCaption, setCaption] = useState('');
  const [postText, setText] = useState('');
  // const [imageUpload, setImage] = useState(null);

  const nameOfPost = useRef(null);
  const captionOfPost = useRef(null);
  const introductionOfPost = useRef(null);


  const focusNameOfPost = () => {
    nameOfPost.current?.focus();
  };

  const focusCaptionOfPost = () => {
    captionOfPost.current?.focus();
  };

  const focusIntroductionOfPost = () => {
    introductionOfPost.current?.focus();
  };

  // // Choose Profile Picture
  // const pickProfilePicture = async () => {
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     includeBase64: false,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   console.log(result);

  //   if (!result.canceled) {
  //     setImage(result.assets[0].uri);
  //   }
  // };

  const handlePress = async (e) => {
    e.preventDefault();
    const url = `http://${clientIpAddress}:3001/subgroup/posts/add`;

    const formData = new FormData();
    formData.append('groupId', currentGroup.subgroupId);

    // if (imageUpload) {
    //   try {
    //     const response = await fetch(imageUpload);
    //     const blob = await response.blob();
    //
    //     // Append the image blob to FormData object
    //     formData.append('titleImage', blob, 'post_img.png');
    //   } catch (error) {
    //     console.error('Error reading image file:', error);
    //   }
    // }

    formData.append('titleImage', ''); // DELETE when image upload is implemented

    formData.append('userId', currentUser.user_id);
    formData.append('heading', postHeading);
    formData.append('caption', postCaption);
    formData.append('text', postText);

    try {
      await axios.post(url, formData);
      Toast.show({
        type: 'success',
        text1: 'Subgroup created',
        visibilityTime: 2000,
        autoHide: true,
      });
      navigation.navigate('Subgroup');
    } catch (err) {
      console.error(
        'Subscribe to main groups error:',
        err.response?.data?.message || err.message
      );
      Toast.show({
        type: 'error',
        text1: 'Failed to create subgroup',
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.backgroundSand }}>
        <View style={{ margin: 20 }}>
        {/* <Filter options={['posts', 'events']} activeButton="posts" />

        <CaptionScribbleHeading
          subHeading="Give it all to me"
          title="Enter all the post infos that are important for people:"
          scribbleSubHeadingImage={GlitterImage}
          scribbleStyle={{ width: 35, height: 35 }}
        /> */}

        <View style={{ marginTop: 40 }}>
          <View style={{ marginBottom: 5 }}>
            <Text style={styles.subtitle2}>Give us a great heading:</Text>
          </View>
          <InputField
            labelText="Name"
            value={postHeading}
            onChangeText={setHeading}
            padding={2}
            marginLeft={0}
            inputRef={nameOfPost}
            onFocus={focusNameOfPost}
          />
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.navLabel}>Limit to 15 Characters</Text>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={{ marginBottom: 5 }}>
            <Text style={styles.subtitle2}>Give us a great Subheading:</Text>
          </View>
          <InputField
            labelText="Caption"
            value={postCaption}
            onChangeText={setCaption}
            padding={2}
            marginLeft={0}
            inputRef={captionOfPost}
            onFocus={focusCaptionOfPost}
          />
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.navLabel}>Limit to 15 Characters</Text>
          </View>
        </View>

        {/* <View style={{ marginTop: 20 }}>
          <Text style={styles.subtitle2}>Add an Image:</Text>
          <View style={{ marginLeft: 20, marginTop: 15 }}>
            <TouchableOpacity
              onPress={pickProfilePicture}
              style={{ paddingTop: 20, paddingBottom: 40 }}
            >
              <Image source={UploadIcon} style={{ width: 60, height: 60 }} />
            </TouchableOpacity>
          </View>
        </View> */}

        <View style={{ marginTop: 20 }}>
          <View style={{ marginBottom: 5 }}>
            <Text style={styles.subtitle2}>Write what is important:</Text>
          </View>
          <InputField
            labelText="Introduction"
            value={postText}
            onChangeText={setText}
            padding={2}
            marginLeft={0}
            inputRef={introductionOfPost}
            onFocus={focusIntroductionOfPost}
          />
        </View>

        <View style={{ marginTop: 40 }}>
          <OrangeButton
            text="Create"
            styleButton={{ alignSelf: 'center', width: '100%' }}
            onPress={handlePress}
          />
        </View>
      </View>
      <Toast />
    </SafeAreaView>
  );
}

export default AddPost;
