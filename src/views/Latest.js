import React from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { theme } from '../constants/myTheme';
import CaptionScribbleHeading from '../components/Texts/CaptionScribbleHeading';
import heartImage from '../../assets/Images/heart-left-image.png';
import Filter from '../components/Filter';
import ArrowImage from '../../assets/Images/arrow-image.png';
import ListItem from '../components/Items/ListItem';
import arrow from '../../assets/Icons/arrow-right.png';

function Latest() {
  const items = [
    { mainTitle: 'Test 1', subtitle: 'Subtitle 1' },
    { mainTitle: 'Test 2', subtitle: 'Subtitle 2' },
    { mainTitle: 'Test 3', subtitle: 'Subtitle 3' },
    { mainTitle: 'Test 4', subtitle: 'Subtitle 4' },
    { mainTitle: 'Test 5', subtitle: 'Subtitle 5' },
    { mainTitle: 'Test 6', subtitle: 'Subtitle 6' },
    { mainTitle: 'Test 7', subtitle: 'Subtitle 7' },

    // Later with Real Data
  ];

  return (
    <SafeAreaView
      style={{ backgroundColor: theme.colors.backgroundSand, flex: 1 }}
    >
      <ScrollView>
        <View style={{ margin: 20 }}>
          <View style={{ flexDirection: 'row', maxWidth: '100%' }}>
            <CaptionScribbleHeading
              subHeading="For You"
              title="Your Latest Interactions"
              scribbleSubHeadingImage={heartImage}
              scribbleStyle={{ width: 35, height: 20 }}
              arrowImage={ArrowImage}
            />
          </View>

          <Filter options={['all', 'yours']} activeButton="all" />

          {items.map((item, index) => (
            <ListItem
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              mainTitle={item.mainTitle}
              subtitle={item.subtitle}
              iconImage={arrow}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Latest;
