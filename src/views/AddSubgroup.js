import React, { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import axios from 'axios';
// import * as ImagePicker from 'expo-image-picker';
import {
  View,
  Text,
  SafeAreaView,
  // Image,
  ScrollView,
  // TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-toast-message';
import InputField from '../components/Items/InputField';
import { styles, theme } from '../constants/myTheme';
import OrangeButton from '../components/Buttons/OrangeButton';
import CaptionScribbleHeading from '../components/Texts/CaptionScribbleHeading';
// import UploadIcon from '../../assets/Icons/upload-icon.png';
import GlitterImage from '../../assets/Images/glitter-image.png';
import {
  selectedGroup,
  selectedUserId,
} from '../redux/features/mainSlice/mainSlice';

function AddSubgroup() {
  const navigation = useNavigation();
  const currentGroup = useSelector(selectedGroup);
  const userId = useSelector(selectedUserId);

  const [groupName, setName] = useState('');
  const [groupCaption, setCaption] = useState('');
  const [disableButton, setDisableButton] = useState(true);
  // const [groupIntro, setIntroduction] = useState('');
  // const [imageUpload, setImage] = useState(null);

  // For focussing on the Input field
  const nameOfSubGroup = useRef(null);
  const captionOfSubGroup = useRef(null);

  const focusNameOfSubInput = () => {
    nameOfSubGroup.current?.focus();
  };

  const focusCaptionInput = () => {
    captionOfSubGroup.current?.focus();
  };

  useEffect(() => {
    if (groupName.trim() === '' || groupCaption.trim() === '') {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  });
  const handlePress = async (e) => {
    e.preventDefault();
    const url = `https://medialab-server.vercel.app/subgroup/add`;
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('name', groupName);
    formData.append('mainGroupId', [currentGroup.mainGroupId]);
    formData.append('caption', groupCaption);
    formData.append('subgroupImage', ''); // DELETE when image upload is implemented
    const headers = { headers: { 'Content-Type': 'multipart/form-data' } };

    try {
      const response = await axios.post(url, formData, headers);
      const { message, groupId } = response.data;
      if (message === 'Subgroup created') {
        Toast.show({
          type: 'success',
          text1: 'Subgroup created',
          visibilityTime: 2000,
          autoHide: true,
        });
        navigation.navigate('Subgroup', { createdGroupId: groupId });
      }
    } catch (err) {
      console.error(
        'Add subgroup error:',
        err.response?.data?.message || err.message
      );
      const errorMessage =
        err.response?.data?.message || 'Failed to create subgroup';
      if (
        errorMessage ===
        'Subgroup with the same name already exists in the main group'
      ) {
        Toast.show({
          type: 'error',
          text1: 'Subgroup with the same name already exists',
          visibilityTime: 2000,
          autoHide: true,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: errorMessage,
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    }
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

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.backgroundSand }}>
      <ScrollView style={{ margin: 20 }}>
        <CaptionScribbleHeading
          subHeading="Give it all to me"
          title="Enter all the infos for your Subgroup"
          scribbleSubHeadingImage={GlitterImage}
          scribbleStyle={{ width: 35, height: 35 }}
        />

        <View style={{ marginTop: 40 }}>
          <View style={{ marginBottom: 5 }}>
            <Text style={styles.subtitle2}>Name your subgroup:</Text>
          </View>
          <InputField
            labelText="Subgroup Name"
            value={groupName}
            onChangeText={setName}
            padding={2}
            marginLeft={0}
            maxLength={15}
            inputRef={nameOfSubGroup}
            onFocus={focusNameOfSubInput}
          />
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.navLabel}>Limit to 15 Characters</Text>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={{ marginBottom: 5 }}>
            <Text style={styles.subtitle2}>Write a great subtitle:</Text>
          </View>
          <InputField
            labelText="Subtitle"
            value={groupCaption}
            onChangeText={setCaption}
            padding={2}
            marginLeft={0}
            maxLength={15}
            inputRef={captionOfSubGroup}
            onFocus={focusCaptionInput}
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
        {/* 
        <View style={{ marginTop: 20 }}>
          <View style={{ marginBottom: 5 }}>
            <Text style={styles.subtitle2}>Write a small Introduction:</Text>
          </View>
          <InputField
            labelText="Introduction"
            value={groupIntro}
            onChangeText={setIntroduction}
            padding={2}
            marginLeft={0}
          />
        </View> */}

        <View style={{ marginTop: 40 }}>
          <OrangeButton
            text="Create"
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
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
}

export default AddSubgroup;
