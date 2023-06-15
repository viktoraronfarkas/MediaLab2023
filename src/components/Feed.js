/* eslint-disable global-require */
import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Buffer } from 'buffer';
import { ActivityIndicator } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import PostCard from './Cards/PostCard';
import { selectedUserId } from '../redux/features/mainSlice/mainSlice';
import { styles, theme } from '../constants/myTheme';
import JoinGroupImage from '../../assets/Images/join-group.png';
import useFetchUserData from '../routes/hooks/useFetchUserData';

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

function Feed({ route }) {
  const [feed, setFeed] = useState();
  const userId = useSelector(selectedUserId);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://medialab-server.vercel.app/user/${userId}/feed`
      );
      setFeed(res.data);
    } catch (error) {
      console.error('Error retrieving feed:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [route?.params?.update])
  );

  const windowWidth = Dimensions.get('window').width;
  // const windowHeight = Dimensions.get('window').height;

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
        authorId={post.user_id}
        postId={post.post_id}
        title={post.heading}
        subTitle={userData.username ? `by: ${userData.username}` : ''}
        content={post.text}
        coverImage={image}
        iconImage={imageUpload}
        disabled
      />
    );
  }
  return (
    <>
      {loading && (
        <View style={style.overlay}>
          <ActivityIndicator animating color={theme.colors.primary} />
        </View>
      )}
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          paddingTop: 20,
          paddingBottom: 10,
          padding: 15,
        }}
      >
        <View style={{ marginBottom: 10, width: '100%', alignItems: 'center' }}>
          {feed?.length === 0 ? (
            <View style={{ marginTop: 15 }}>
              <Image
                style={{
                  height: windowWidth,
                  width: windowWidth,
                  opacity: 0.8,
                }}
                source={JoinGroupImage}
              />
              <Text
                style={[
                  styles.headline1,
                  {
                    textAlign: 'center',
                    justifyContent: 'center',
                    marginBottom: 10,
                  },
                ]}
              >
                No Posts Yet!
              </Text>
              <Text
                style={[
                  styles.bodyDefault,
                  { textAlign: 'center', justifyContent: 'center' },
                ]}
              >
                Create a post yourself. Join a new group and subgroup and create
                a post for you and others to see.
              </Text>
            </View>
          ) : (
            feed
              ?.slice() // Create a copy of the array
              .sort((a, b) => b.timestamp - a.timestamp) // Sort the copied array in descending order based on timestamp
              .reverse() // Reverse the sorted array to display the most recent post at the top
              .map((post, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <PostCardWithUserData key={index} post={post} />
              ))
          )}
        </View>
      </ScrollView>
    </>
  );
}

export default Feed;
