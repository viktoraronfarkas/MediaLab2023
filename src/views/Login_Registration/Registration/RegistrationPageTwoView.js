import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles, theme } from '../../../constants/myTheme';
import OrangeButton from '../../../components/Buttons/OrangeButton';
import CaptionScribbleHeading from '../../../components/Texts/CaptionScribbleHeading';
import CaptionScribbleHeadingMirror from '../../../components/Texts/CaptionScribbleHeadingMirror';
import GroupIconContainer from '../../../components/GroupIconContainer';
import PostCardShowCase from '../../../components/Cards/PostCardShowCase';
import ListItem from '../../../components/Items/ListItem';
import underline from '../../../../assets/Images/under-line-image.png';
import arrow from '../../../../assets/Images/arrow-image.png';
import arrowIcon from '../../../../assets/Icons/arrow-right.png';
import coverImage from '../../../../assets/play.jpeg';
import groupImage from '../../../../assets/Images/mainGroupExample.png';

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
        <View style={{ paddingHorizontal: 10 }}>
          <CaptionScribbleHeading
            title="Main Groups"
            headlineStyle={{ fontSize: 32 }}
            underlineImage={underline}
            arrowImage={arrow}
            underlineStyle={{ width: 100, top: 45, left: 70 }}
          />

          <View style={{ paddingVertical: 30 }}>
            <GroupIconContainer
              title="Sport"
              imageSource={groupImage}
              imageStyle={{ width: 130, height: 130 }}
            />
          </View>

          <Text style={[styles.bodyDefault, { paddingBottom: 50 }]}>
            We provide pre-defined main groups for our users. They include all
            the study programmes and a variety of other free time activities
            like sport, music, food or arts. In case you are unable to find a
            group that fits your needs you can always go to the group “Random”.
          </Text>

          <CaptionScribbleHeadingMirror
            title="Sub Groups"
            underlineImage={underline}
            arrowImage={arrow}
            underlineStyle={{ width: 130, top: 52 }}
            headlineStyle={{ width: 250 }}
          />

          <View style={{ paddingVertical: 30 }}>
            <ListItem
              mainTitle="Computer Graphics"
              subtitle="All semesters welcome!"
              iconImage={arrowIcon}
            />
            <ListItem
              mainTitle="E-Sports"
              subtitle="Mostly Fifa!"
              iconImage={arrowIcon}
            />
          </View>
          <Text style={[styles.bodyDefault, { paddingBottom: 50 }]}>
            Inside our Main Groups you and others can create or join Subgroups.
            These relate to the main groups that they are in. For example the
            Subgroups “Swimming” and “E-Sports” belong to the Main Groups
            “Sports”.
          </Text>

          <CaptionScribbleHeading
            title="Posts"
            headlineStyle={{ fontSize: 32 }}
            underlineImage={underline}
            arrowImage={arrow}
            underlineStyle={{ width: 90, top: 48, left: 2 }}
          />

          <View style={{ paddingBottom: 5, paddingTop: 30 }}>
            <PostCardShowCase
              title="Header"
              subTitle="by: Displayed Name"
              buttonText="More"
              content="We meet to play every Friday."
              coverImage={coverImage}
            />
          </View>
          <Text style={[styles.bodyDefault, { paddingBottom: 50 }]}>
            You and other users can create posts inside the Subgroups. Users
            subscribed to the Subgroups can comment on these posts to get or
            share the information that they need.
          </Text>
          <OrangeButton
            text="Next"
            onPress={handlePage3Click}
            styleButton={{ alignSelf: 'center', width: '100%' }}
          />
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
