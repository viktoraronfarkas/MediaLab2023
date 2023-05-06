/* eslint-disable global-require */
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PostCard from '../components/PostCard';
import EventCard from '../components/EventCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
function HomeContent() {
  return (
    <SafeAreaView edges={['left', 'right']} style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            paddingTop: 20,
            paddingBottom: 10,
            padding: 15,
          }}
        >
          <View
            style={{ marginBottom: 10, width: '100%', alignItems: 'center' }}
          >
            <PostCard
              buttonTxt="Comment"
              title="Computer graphics"
              subTitle="Study Group"
              content="Heyyy, I am searching for a study group for computer graphics :)"
              source={require('../../assets/media.png')}
              iconSource={require('../../assets/Application-of-Computer-Graphics-1.png')}
            />
          </View>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginBottom: 10,
                alignItems: 'center',
                width: '100%',
              }}
            >
              <View style={{ flex: 1, marginRight: 10 }}>
                <EventCard
                  title="Study session"
                  subTitle="02.04"
                  source={require('../../assets/media.png')}
                  style={{ marginRight: 10 }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <EventCard
                  title="Study session"
                  subTitle="24.04"
                  source={require('../../assets/study.jpeg')}
                  style={{ marginRight: 10 }}
                />
              </View>
            </View>
          </View>
          <View
            style={{ marginBottom: 10, width: '100%', alignItems: 'center' }}
          >
            <PostCard
              buttonTxt="Comment"
              title="Foodshare"
              subTitle="just comment ;)"
              source={require('../../assets/food.png')}
              iconSource={require('../../assets/foodshare.jpg')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default function Home() {
  return <HomeContent />;
}
