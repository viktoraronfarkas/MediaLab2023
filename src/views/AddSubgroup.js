import React from 'react';
import { View, Text, SafeAreaView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/Items/InputField';
import { styles, theme } from '../constants/myTheme';
import OrangeButton from '../components/Buttons/OrangeButton';
import CaptionScribbleHeading from '../components/Texts/CaptionScribbleHeading';
import UploadIcon from '../../assets/Icons/upload-icon.png';
import GlitterImage from '../../assets/Images/glitter-image.png';
import BackButton from '../components/Buttons/BackButton';

function AddSubgroup() {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.goBack(null);
    // dispatch(actionExample(''));
  };
  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.backgroundSand }}>
      <View style={{ margin: 20 }}>
        <View style={{ marginBottom: 10, marginTop: 10 }}>
          <BackButton text="back" onPress={handlePress} />
        </View>
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
          <InputField labelText="Name" />
          <View style={{ marginLeft: 40 }}>
            <Text style={styles.navLabel}>Limit to 15 Characters</Text>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={{ marginBottom: 5 }}>
            <Text style={styles.subtitle2}>Write a great caption:</Text>
          </View>
          <InputField labelText="Caption" />
          <View style={{ marginLeft: 40 }}>
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
          <InputField labelText="Introduction" />
        </View>

        <View style={{ marginTop: 40 }}>
          <OrangeButton
            text="Post me!"
            styleButton={{ alignSelf: 'center', width: '100%' }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default AddSubgroup;
