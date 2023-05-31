import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../../constants/myTheme';
import OrangeButton from '../../../components/Buttons/OrangeButton';
import CaptionScribbleHeading from '../../../components/Texts/CaptionScribbleHeading';
import CaptionScribbleHeadingMirror from '../../../components/Texts/CaptionScribbleHeadingMirror';
import GroupIconContainer from '../../../components/GroupIconContainer';
import EventCard from '../../../components/Cards/EventCard';
import PostCard from '../../../components/Cards/PostCard';
import ListItem from '../../../components/Items/ListItem';
import underline from '../../../../assets/Images/under-line-image.png';
import arrow from '../../../../assets/Images/arrow-image.png';
import arrowIcon from '../../../../assets/Icons/arrow-right.png';
import coverImage from '../../../../assets/foodshare.jpg';

const style = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: theme.colors.backgroundSand,
  },
});

export default function RegistrationPageTwoView() {
  const navigation = useNavigation();
  const handlePage3Click = () => {
    navigation.navigate('RegistrationThree');
  };
  return (
    <SafeAreaView style={style.container}>
      <ScrollView>
        <View style={{ paddingHorizontal: 25 }}>
          <CaptionScribbleHeading
            subHeading="Our concept"
            title="We use a system of main groups, inside those are subgroups that relate to the main groups. Inside the subgroups there are posts and events that you and others can create and interact with."
            headlineStyle={{ width: 320 }}
          />

          <CaptionScribbleHeading
            title="Main Groups"
            headlineStyle={{ fontSize: 32, width: 180 }}
            underlineImage={underline}
            arrowImage={arrow}
            underlineStyle={{ width: 100, top: 45, left: 70 }}
          />

          <View style={{ paddingVertical: 30 }}>
            <GroupIconContainer
              title="Music"
              imageStyle={{ width: 130, height: 130 }}
            />
          </View>

          <CaptionScribbleHeadingMirror
            title="Sub Groups"
            headlineStyle={{ width: 160 }}
            underlineImage={underline}
            arrowImage={arrow}
            underlineStyle={{ width: 130, top: 52 }}
          />

          <View style={{ paddingVertical: 30 }}>
            <ListItem
              mainTitle="Computer Graphics"
              subtitle="All semesters welcome!"
              iconImage={arrowIcon}
            />
            <ListItem
              mainTitle="Study Group"
              subtitle="Join us!"
              iconImage={arrowIcon}
            />
          </View>
          <CaptionScribbleHeading
            title="Posts & Events"
            headlineStyle={{ fontSize: 32, width: 200 }}
            underlineImage={underline}
            arrowImage={arrow}
            underlineStyle={{ width: 180, top: 48, left: 10 }}
          />
          <View style={{ paddingVertical: 30, paddingHorizontal: 50 }}>
            <EventCard joiningNumber={17} title="Party" subTitle="31.06" />
          </View>
          <View style={{ paddingBottom: 30 }}>
            <PostCard
              title="Foodshare"
              subTitle="Just comment ;)"
              buttonText="Comment"
              content="You can make a comment on this post"
              coverImage={coverImage}
            />
          </View>
          <OrangeButton
            text="Next"
            onPress={handlePage3Click}
            styleButton={{ alignSelf: 'center', width: '100%' }}
          />
        </View>
        <View style={{height: 40}} />
      </ScrollView>
    </SafeAreaView>
  );
}
