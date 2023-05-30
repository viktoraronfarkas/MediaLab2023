import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native';
import InputField from '../components/Items/InputField';
import { styles, theme } from '../constants/myTheme';
import OrangeButton from '../components/Buttons/OrangeButton';
import CaptionScribbleHeading from '../components/Texts/CaptionScribbleHeading';
import UploadIcon from '../../assets/Icons/upload-icon.png';
import GlitterImage from '../../assets/Images/glitter-image.png';
import {
  selectedGroup,
  IpAddress,
} from '../redux/features/mainSlice/mainSlice';

function AddSubgroup() {
  const navigation = useNavigation();
  const currentGroup = useSelector(selectedGroup);
  const clientIpAddress = useSelector(IpAddress);

  const [groupName, setName] = useState('');
  const [groupCaption, setCaption] = useState('');
  const [groupIntro, setIntroduction] = useState('');
  // const [subgroupImg, setSubgroupImg] = useState('');

  const handlePress = async (e) => {
    e.preventDefault();
    const url = `http://${clientIpAddress}:3001/subgroup/add`;
    try {
      await axios.post(url, {
        name: groupName, // Replace with the actual user ID
        mainGroupId: [currentGroup.mainGroupId], // Pass the main group ID as an array
        caption: groupCaption,
        introduction: groupIntro,
        subgroupImage: '',
      });
      navigation.goBack();
    } catch (err) {
      console.error(
        'Subscribe to main groups error:',
        err.response?.data?.message || err.message
      );
    }
  };

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
            <Text style={styles.subtitle2}>Name your Subgroup:</Text>
          </View>
          <InputField
            labelText="Name"
            value={groupName}
            onChangeText={setName}
            padding={2}
            marginLeft={0}
            maxLength={15}
          />
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.navLabel}>Limit to 15 Characters</Text>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={{ marginBottom: 5 }}>
            <Text style={styles.subtitle2}>Write a great caption:</Text>
          </View>
          <InputField
            labelText="Caption"
            value={groupCaption}
            onChangeText={setCaption}
            padding={2}
            marginLeft={0}
            maxLength={15}
          />
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.navLabel}>Limit to 15 Characters</Text>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.subtitle2}>Add an Image:</Text>
          <View style={{ marginLeft: 20, marginTop: 15 }}>
            <Image source={UploadIcon} style={{ width: 60, height: 60 }} />
          </View>
        </View>

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
        </View>

        <View style={{ marginTop: 40 }}>
          <OrangeButton
            text="Create"
            styleButton={{ alignSelf: 'center', width: '100%' }}
            onPress={handlePress}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default AddSubgroup;
