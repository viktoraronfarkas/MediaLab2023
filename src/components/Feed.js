/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Buffer } from 'buffer';
import { ActivityIndicator } from 'react-native-paper';
import PostCard from './Cards/PostCard';
import useFetchFeed from '../routes/hooks/useFetchFeed';
import { setFeed, feed } from '../redux/features/mainSlice/mainSlice';
import useFetchUserData from '../routes/hooks/useFetchUserData';
import { theme } from '../constants/myTheme';

const style = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function Feed() {
  const fetchedFeed = useFetchFeed();
  const dispatch = useDispatch();
  let storedFeed = useSelector(feed);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(setFeed(fetchedFeed));
    setLoading(false); // Set loading to false after the feed is fetched
  }, [dispatch, fetchedFeed]);

  if (Object.keys(storedFeed).length === 0) {
    storedFeed = [];
  }

  const arrayBufferToBase64 = (buffer) => {
    const bytes = new Uint8Array(buffer);
    const binary = Array.from(bytes)
      .map((byte) => String.fromCharCode(byte))
      .join('');
    const base64 = Buffer.from(binary, 'binary').toString('base64');
    return base64;
  };

  function PostCardWithUserData({ post }) {
    const { userData, imageUpload } = useFetchUserData(post.user_id);

    let image = null;
    if (post.title_image && post.title_image.data) {
      try {
        image = `data:image/jpeg;base64,${arrayBufferToBase64(
          post.title_image.data
        )}`;
      } catch (error) {
        console.error('Error converting ArrayBuffer to base64:', error);
      }
    }

    return (
      <PostCard
        title={post.heading}
        subTitle={`created by: ${userData.username}`}
        content={post.text}
        coverImage={image}
        iconImage={imageUpload}
        disabled
      />
    );
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
            // eslint-disable-next-line react/no-array-index-key
            <PostCardWithUserData key={index} post={post} />
          ))}
      </View>

      {loading && (
        <View style={style.overlay}>
          <ActivityIndicator animating color={theme.colors.primary} />
        </View>
      )}
    </View>
  );
}

export default Feed;
