import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../../../constants/myTheme';
import OrangeButton from '../../../components/Buttons/OrangeButton';
import CaptionScribbleHeading from '../../../components/Texts/CaptionScribbleHeading';
import GroupIconContainer from '../../../components/GroupIconContainer';
// import HorizontalScrollViewBig from '../../../components/HorizontalScrollViewBig';
import preDefinedGroups from '../../../TestData/predefinedGroups';

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: theme.colors.backgroundSand,
  },
});

export default function RegistrationPageThreeView({
  handleSubmit,
  onGroupsSelected,
  selectedGroups,
}) {
  return (
    <SafeAreaView style={style.container}>
      <ScrollView>
        <CaptionScribbleHeading
          subHeading="Click down below, to add groups:"
          title="Before you’re good to go, here are some groups you can join right away:"
          headlineStyle={{ width: 350 }}
        />
        <ScrollView horizontal>
          {preDefinedGroups.map((group) => (
            <TouchableOpacity
              key={group.group_id}
              onPress={() => onGroupsSelected(group.name)}
              style={{
                padding: 10,
                backgroundColor: selectedGroups.includes(group.name)
                  ? theme.colors.primary
                  : '#FFFFFF00',
                marginRight: 10,
                borderRadius: 5,
              }}
            >
              <GroupIconContainer
                title={group.name}
                imageStyle={{ width: 130, height: 130 }}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <OrangeButton
          text="Finish"
          onPress={handleSubmit}
          styleButton={{ alignSelf: 'center', width: '100%' }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
