import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../../constants/myTheme';
import OrangeButton from '../../../components/Buttons/OrangeButton';
import CaptionScribbleHeading from '../../../components/Texts/CaptionScribbleHeading';
import GroupIconContainer from '../../../components/GroupIconContainer';
import ListItem from '../../../components/Items/ListItem';
import underline from '../../../../assets/Images/under-line-image.png';
import arrow from '../../../../assets/Images/arrow-image.png';
import arrowIcon from '../../../../assets/Icons/arrow-right.png';

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
        <CaptionScribbleHeading
          subHeading="Our concept"
          title="We use a system of main groups, inside those are subgroups that relate to the main groups. Inside the subgroups there are posts and events that you and others can create and interact with."
          headlineStyle={{ width: 350 }}
        />

        <CaptionScribbleHeading
          title="Main Groups"
          headlineStyle={{ width: 400 }}
          underlineImage={underline}
          arrowImage={arrow}
          lineStyle={{ height: 50, width: 50 }}
        />

        <GroupIconContainer title="Music" />


        <ListItem mainTitle="Computer Graphics" subtitle="All semesters welcome!" iconImage={arrowIcon} />
        <ListItem mainTitle="Study Group" subtitle="Join us!" iconImage={arrowIcon} />
        <OrangeButton
          text="Next"
          onPress={handlePage3Click}
          styleButton={{ alignSelf: 'center', width: '100%' }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
