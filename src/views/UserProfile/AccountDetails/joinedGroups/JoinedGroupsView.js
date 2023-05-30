import React from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import { theme } from '../../../../constants/myTheme';
import TitleArrowHeading from '../../../../components/Texts/TitleArrowHeading';
import ListItem from '../../../../components/Items/ListItem';
import GroupIconContainer from '../../../../components/GroupIconContainer';
import arrowImage from '../../../../../assets/Images/arrow-image.png';
import iconImageArrowRight from '../../../../../assets/Icons/arrow-right.png';

/**
 * This is the main Joined Groups View / UI
 * Main and Sub Groups are mapped here.
 *
 */
export default function JoinedGroupsView({
  maingroups,
  maingroupKey,
  maingroupImage,
  maingroupTitle,

  subgroups,
  subgroupKey,
  subgroupMainTitle,
  subgroupSubTitle,
}) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{
          paddingHorizontal: 15,
          backgroundColor: theme.colors.backgroundSand,
        }}
      >
        {/* Header Groups */}
        <View style={{ paddingVertical: 10, marginTop: 20 }}>
          <TitleArrowHeading
            title="Joined Groups"
            arrowImage={arrowImage}
            arrowStyle={{ height: 70, width: 100, bottom: 20 }}
          />
        </View>

        {/* Map the Main Groups as Containers */}
        {maingroups.map((maingroup) => (
          <GroupIconContainer
            key={maingroup[maingroupKey]}
            imageSource={maingroup[maingroupImage]}
            title={maingroup[maingroupTitle]}
          />
        ))}

        {/* Header Sub-Groups */}
        <View style={{ paddingVertical: 10 }}>
          <TitleArrowHeading
            title="joined subgroups"
            arrowImage={arrowImage}
            arrowStyle={{ height: 70, width: 100, bottom: 20 }}
          />
        </View>

        {/* Map the Sub Groups as ListItems */}
        {subgroups.map((subgroup) => (
          <ListItem
            key={subgroup[subgroupKey]}
            mainTitle={subgroup[subgroupMainTitle]}
            subtitle={subgroup[subgroupSubTitle]}
            iconImage={iconImageArrowRight}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
