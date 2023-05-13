/* eslint-disable global-require */
import React from 'react';
import { View } from 'react-native';
import PostCard from './Cards/PostCard';
import EventCard from './Cards/EventCard';

function Feed() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 10,
        padding: 15,
      }}
    >
      <View style={{ marginBottom: 10, width: '100%', alignItems: 'center' }}>
        <PostCard
          buttonText="Comment"
          title="Computer graphics"
          subTitle="Study Group"
          content="Heyyy, I am searching for a study group for computer graphics :)"
          coverImage={require('../../assets/media.png')}
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
              cardImage={require('../../assets/media.png')}
              joiningNumber={20}
              style={{ marginRight: 10 }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <EventCard
              title="Study session"
              subTitle="24.04"
              cardImage={require('../../assets/study.jpeg')}
              joiningNumber={0}
              style={{ marginRight: 10 }}
            />
          </View>
        </View>
      </View>
      <View style={{ marginBottom: 10, width: '100%', alignItems: 'center' }}>
        <PostCard
          buttonText="Comment"
          title="Foodshare"
          subTitle="just comment ;)"
          coverImage={require('../../assets/food.png')}
          iconSource={require('../../assets/foodshare.jpg')}
        />
      </View>
    </View>
  );
}

export default Feed;
