import React from 'react';
import { View, Text, SafeAreaView, Image } from 'react-native';
import InputField from '../components/Items/InputField';
import { styles, theme } from '../constants/myTheme';
import OrangeButton from '../components/Buttons/OrangeButton';
import CaptionScribbleHeading from '../components/Texts/CaptionScribbleHeading';
import UploadIcon from '../../assets/Icons/upload-icon.png';
import GlitterImage from '../../assets/Images/glitter-image.png';
import BackButton from '../components/Buttons/BackButton';
import Filter from '../components/Filter';

function AddSubgroup() {
  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.backgroundSand }}>
      <View style={{ margin: 20 }}>
        <View style={{ marginBottom: 10, marginTop: 10 }}>
          <BackButton text="back" />
        </View>

        <Filter options={['posts', 'events']} activeButton="events" />

        <CaptionScribbleHeading
          subHeading="Give it all to me"
          title="Enter all the event infos that are important for people:"
          scribbleSubHeadingImage={GlitterImage}
          scribbleStyle={{ width: 35, height: 35 }}
        />

        <View style={{ marginTop: 40 }}>
          <View style={{ marginBottom: 5 }}>
            <Text style={styles.subtitle2}>Give us a great heading:</Text>
          </View>
          <InputField labelText="Name" padding={2} marginLeft={0} />
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.navLabel}>Limit to 15 Characters</Text>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={{ marginBottom: 5 }}>
            <Text style={styles.subtitle2}>Enter a date and time:</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <InputField
                labelText="mm/dd/yyyy"
                padding={2}
                marginLeft={0}
                width="100%"
              />
            </View>
            <Text style={{ alignSelf: 'center', marginHorizontal: 10 }}>/</Text>
            <View style={{ flex: 1 }}>
              <InputField
                labelText="00:00 PM"
                padding={2}
                marginLeft={0}
                width="100%"
              />
            </View>
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
            <Text style={styles.subtitle2}>Write a small info:</Text>
          </View>
          <InputField labelText="Introduction" padding={2} marginLeft={0} />
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
