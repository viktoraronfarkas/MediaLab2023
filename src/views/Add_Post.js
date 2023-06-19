import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
// import * as ImagePicker from 'expo-image-picker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import InputField from '../components/Items/InputField';
import { styles, theme } from '../constants/myTheme';
import OrangeButton from '../components/Buttons/OrangeButton';
import CaptionScribbleHeading from '../components/Texts/CaptionScribbleHeading';
import UploadIcon from '../../assets/Icons/upload-icon.png';
import cancelIcon from '../../assets/Icons/cancel-icon.png';
import checkIcon from '../../assets/Icons/check-icon.png';
import GlitterImage from '../../assets/Images/glitter-image.png';
// import BackButton from '../components/Buttons/BackButton';
// import Filter from '../components/Filter';
import {
  selectedSubGroup,
  selectedUserId,
} from '../redux/features/mainSlice/mainSlice';

const style = StyleSheet.create({
  imageUploadedContainer: {
    paddingVertical: 40,
    flexDirection: 'column',
  },
  infoImageContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: theme.colors.neutralsWhite,
    borderWidth: 4,
  },

  iconCancel: {
    width: 30,
    height: 30,
  },
  iconCheck: {
    width: 50,
    height: 50,
  },
});
function AddPost() {
  const navigation = useNavigation();
  const currentGroup = useSelector(selectedSubGroup);
  const currentUser = useSelector(selectedUserId);
  const scrollViewRef = useRef(null);

  // const [postImg, setImg] = useState('');
  const [postHeading, setHeading] = useState('');
  const [postText, setText] = useState('');
  const [disableButton, setDisableButton] = useState(true);
  // const [imageUpload, setImage] = useState(null);
  const [imageUpload, setImage] = useState(null);

  const nameOfPost = useRef(null);
  const introductionOfPost = useRef(null);

  const focusNameOfPost = () => {
    nameOfPost.current?.focus();
  };

  const focusIntroductionOfPost = () => {
    introductionOfPost.current?.focus();
  };

  useEffect(() => {
    if (postHeading.trim() === '' || postText.trim() === '') {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  });

  // // Choose Profile Picture
  const pickPostPicture = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      includeBase64: true,
      base64: true, // Set this option to include base64-encoded data URL
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (result.assets[0].fileSize > 25 * 1024 * 1024) {
        Toast.show({
          type: 'error',
          text1: 'Image file size exceeds the limit > 25mb',
          visibilityTime: 5000,
          autoHide: true,
        });
      } else {
        setImage(result.assets[0].uri);
      }
    }
  };

  const handlePress = async (e) => {
    e.preventDefault();
    const url = `https://medialab-server.vercel.app/subgroup/posts/add`;

    const formData = new FormData();
    formData.append('groupId', currentGroup.subgroupId);

    if (imageUpload) {
      if (Platform.OS === 'web') {
        try {
          const response = await fetch(imageUpload);
          const blob = await response.blob();
          // Append the image blob to FormData object
          formData.append('title_image', blob, 'title_image.png');
        } catch (error) {
          console.error('Error reading image file:', error);
        }
      } else {
        formData.append('title_image', {
          uri: imageUpload,
          type: 'image/jpeg',
          name: 'user_image.jpg',
        });
      }
    }

    formData.append('userId', currentUser);
    formData.append('heading', postHeading);
    formData.append('text', postText);
    const headers = { headers: { 'Content-Type': 'multipart/form-data' } };

    try {
      await axios.post(url, formData, headers);
      Toast.show({
        type: 'success',
        text1: 'Post created',
        visibilityTime: 2000,
        autoHide: true,
      });
      navigation.navigate('Subgroup', { update: true });
    } catch (err) {
      console.error(
        'Subscribe to main groups error:',
        err.response?.data?.message || err.message
      );
      Toast.show({
        type: 'error',
        text1: 'Failed to create Post',
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.backgroundSand }}>
      <ScrollView ref={scrollViewRef} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ margin: 20 }}>
          <CaptionScribbleHeading
            subHeading="Give it all to me"
            title="Enter all the post infos that are important for people:"
            scribbleSubHeadingImage={GlitterImage}
            scribbleStyle={{ width: 35, height: 35 }}
          />

          <View style={{ marginTop: 40 }}>
            <View style={{ marginBottom: 5 }}>
              <Text style={styles.subtitle2}>Give us a great title:</Text>
            </View>
            <InputField
              labelText="Title"
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
              <Text style={styles.subtitle2}>Write what is important:</Text>
            </View>
            <InputField
              labelText="What's on your mind..."
              value={postText}
              onChangeText={setText}
              padding={2}
              marginLeft={0}
              inputRef={introductionOfPost}
              onFocus={focusIntroductionOfPost}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.subtitle2}>Add an Image:</Text>
            <View style={{ marginLeft: 20, marginTop: 15 }}>
              <TouchableOpacity
                onPress={pickPostPicture}
                style={{ paddingTop: 20, paddingBottom: 40 }}
              >
                <Image source={UploadIcon} style={{ width: 60, height: 60 }} />
              </TouchableOpacity>
            </View>
          </View>
          {imageUpload && (
            <View style={style.imageUploadedContainer}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source={{ uri: imageUpload }}
                  style={style.profileImage}
                />
              </View>

              <View style={style.infoImageContainer}>
                <Image source={checkIcon} style={style.iconCheck} />
                {/* <Text>File: Name:{imageUpload.fileNameImage}</Text> */}

                <TouchableOpacity onPress={() => setImage(null)}>
                  <Image source={cancelIcon} style={style.iconCancel} />
                </TouchableOpacity>
              </View>
            </View>
          )}

          <View style={{ marginTop: 40 }}>
            <OrangeButton
              text="Post"
              styleButton={{ alignSelf: 'center', width: '100%' }}
              buttonBackgroundColor={
                disableButton
                  ? theme.colors.neutralsGrey500
                  : theme.colors.primary
              }
              onPress={handlePress}
              // eslint-disable-next-line no-unneeded-ternary
              disable={disableButton ? true : false}
            />
          </View>
        </View>
        <Toast />
      </ScrollView>
    </SafeAreaView>
  );
}

export default AddPost;
