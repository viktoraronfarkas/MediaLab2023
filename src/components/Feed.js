/* eslint-disable global-require */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View } from 'react-native';
import PostCard from './Cards/PostCard';
import useFetchFeed from '../routes/hooks/useFetchFeed';
import { setFeed, feed } from '../redux/features/mainSlice/mainSlice';

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
        {storedFeed
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
        ))}
      </View>
    </View>
  );
}

export default Feed;
