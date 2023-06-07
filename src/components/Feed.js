import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Image, Dimensions } from 'react-native';
import PostCard from './Cards/PostCard';
import useFetchFeed from '../routes/hooks/useFetchFeed';
import { setFeed, feed } from '../redux/features/mainSlice/mainSlice';
import { styles, theme } from '../constants/myTheme';
import JoinGroupImage from '/assets/Images/join-group.png';

function Feed() {
  const fetchedFeed = useFetchFeed();
  const dispatch = useDispatch();
  let storedFeed = useSelector(feed);

  useEffect(() => {
    dispatch(setFeed(fetchedFeed));
  }, [dispatch, fetchedFeed]);

  if (Object.keys(storedFeed).length === 0) {
    storedFeed = [];
  }

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

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
        {storedFeed.length === 0 ? (
          <View style={{ marginTop: 15}}>
            <Image
            style={{    
              height: windowWidth,  
              width: windowWidth,  
              opacity: 0.8,
            }}
            source={JoinGroupImage}
            />
            <Text
              style={[styles.headline1, { textAlign: 'center', justifyContent: 'center', marginBottom: 10}]}
            >
              No Posts Yet!
            </Text>
            <Text 
              style={[styles.bodyDefault, { textAlign: 'center', justifyContent: 'center', }]}
            >
              Create a post yourself. Join a new group and subgroup and create a post for you and others to see.
            </Text>
          </View>
        ) : (
          storedFeed
            .slice() // Create a copy of the array
            .sort((a, b) => b.timestamp - a.timestamp) // Sort the copied array in descending order based on timestamp
            .reverse() // Reverse the sorted array to display the most recent post at the top
            .map((post, index) => (
              <PostCard
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                title={post.heading}
                subTitle={post.caption}
                content={post.text}
                coverImage={require('../../assets/media.png')}
                iconSource={require('../../assets/Application-of-Computer-Graphics-1.png')}
                disabled
              />
            ))
        )}
      </View>
    </View>
  );
}

export default Feed;