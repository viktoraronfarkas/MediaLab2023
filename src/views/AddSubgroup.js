import React from 'react';
import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native';
import InputField from '../components/Items/InputField';
import { styles, theme } from '../constants/myTheme';
import OrangeButton from '../components/Buttons/OrangeButton';
import CaptionScribbleHeading from '../components/Texts/CaptionScribbleHeading';
import UploadIcon from '../../assets/Icons/upload-icon.png';
import GlitterImage from '../../assets/Images/glitter-image.png';

function AddSubgroup() {
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
          <InputField labelText="Name" padding={2} marginLeft={0} />
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.navLabel}>Limit to 15 Characters</Text>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={{ marginBottom: 5 }}>
            <Text style={styles.subtitle2}>Write a great caption:</Text>
          </View>
          <InputField labelText="Caption" padding={2} marginLeft={0} />
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
          <InputField labelText="Introduction" padding={2} marginLeft={0} />
        </View>

        <View style={{ marginTop: 40 }}>
          <OrangeButton
            text="Create"
            styleButton={{ alignSelf: 'center', width: '100%' }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default AddSubgroup;
