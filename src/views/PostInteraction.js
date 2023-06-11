import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { styles, theme } from '../constants/myTheme';
import OrangeButton from '../components/Buttons/OrangeButton';
import underlineImage from '../../assets/Images/thin-underline-image.png';
import {
  selectedPost,
  IpAddress,
  selectedUserId,
} from '../redux/features/mainSlice/mainSlice';

function PostInteraction({ route }) {
  const navigation = useNavigation();
  const postData = useSelector(selectedPost);
  const clientIpAddress = useSelector(IpAddress);
  const currentUserId = useSelector(selectedUserId);
  const [author, setAuthor] = useState({});
  const [hasDeleteRights, setHasDeleteRights] = useState();

  const deletePost = () => {
    const url = `http://${clientIpAddress}:3001/subgroup/posts/${postData.postId}/delete`;
    axios
      .delete(url)
      .then(navigation.navigate(route.params.screenName, { update: true }))
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (postData.authorId) {
      const url = `http://${clientIpAddress}:3001/user/${postData.authorId}`;

      axios.get(url).then((res) => {
        setAuthor(res.data);
      });
    }
  }, [postData.authorId]);

  useEffect(() => {
    if (postData?.authorId?.toString() === currentUserId) {
      setHasDeleteRights(true);
    } else {
      setHasDeleteRights(false);
    }
  }, [currentUserId, postData.authorId]);

  return (
    <SafeAreaView
      style={{ backgroundColor: theme.colors.backgroundSand, flex: 1 }}
    >
      <ScrollView>
        <View style={{ margin: 20 }}>
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={[styles.headline1, { textAlign: 'center' }]}>
              {postData.title}
            </Text>
            <Image source={underlineImage} style={{ width: 340, height: 30 }} />
          </View>
          <Text
            style={[
              styles.bodyDefault,
              { marginTop: 50, paddingHorizontal: 20 },
            ]}
          >
            {postData.content}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 80,
              justifyContent: 'center',
            }}
          >
            <Text style={[styles.headline3, { marginLeft: 10 }]}>
              created by:
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50 / 2,
                  overflow: 'hidden',
                  marginLeft: 5,
                  marginTop: -10,
                }}
              />
            </View>
          </View>
          <View style={{ marginTop: 30 }}>
            <View>
              <Text
                style={[
                  styles.subtitle1,
                  {
                    marginLeft: 10,
                    marginBottom: 5,
                    color: theme.colors.primary,
                  },
                ]}
              >
                Displayed Name
              </Text>
              <Text
                style={[
                  styles.bodyDefault,
                  { marginLeft: 10, marginBottom: 20 },
                ]}
              >
                {author.username}
              </Text>
            </View>

            <View>
              <Text
                style={[
                  styles.subtitle1,
                  {
                    marginLeft: 10,
                    marginBottom: 5,
                    color: theme.colors.primary,
                  },
                ]}
              >
                Full Name
              </Text>
              <Text
                style={[
                  styles.bodyDefault,
                  { marginLeft: 10, marginBottom: 15 },
                ]}
              >
                {author.name}
              </Text>
            </View>

            <View>
              <Text
                style={[
                  styles.subtitle1,
                  {
                    marginLeft: 10,
                    marginBottom: 5,
                    color: theme.colors.primary,
                  },
                ]}
              >
                Email
              </Text>
              <Text
                style={[
                  styles.bodyDefault,
                  { marginLeft: 10, marginBottom: 15 },
                ]}
              >
                {author.email}
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 50 }}>
            {hasDeleteRights === true ? (
              <OrangeButton
                text="Delete"
                styleButton={{ alignSelf: 'center', width: '30%' }}
                onPress={deletePost}
              />
            ) : (
              ''
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default PostInteraction;
