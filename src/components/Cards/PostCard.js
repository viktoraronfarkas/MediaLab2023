import React from 'react';
import { Image, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Card, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { theme, styles } from '../../constants/myTheme';
import OrangeButton from '../Buttons/OrangeButton';
import IconImageDefault from '../../../assets/Icons/group-default-icon.png';
import { setSelectedPost } from '../../redux/features/mainSlice/mainSlice';

const style = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 25,
    backgroundColor: theme.colors.backgroundWhite,
  },
  separator: {
    borderBottomWidth: 10,
    borderBottomColor: theme.colors.neutralsBlack,
    marginVertical: 10,
  },
});

function LeftContent({ iconImage }) {
  return iconImage ? (
    <Image
      style={{
        width: 55,
        height: 55,
        borderRadius: 35,
      }}
      source={{ uri: iconImage }}
    />
  ) : (
    <Image
      style={{
        width: 55,
        height: 55,
        borderRadius: 35,
      }}
      source={IconImageDefault}
    />
  );
}

/** This Component represents the post card.
 * The coverImage, iconImage are optional.
 * If no iconImage --> show default image.
 *
 * EXAMPLE: <PostCard title={'Title'} subTitle={'Subtitle'}  buttonText={'Button'}  content={'This is the text content'} />
 */
export default function PostCard({
  title,
  subTitle,
  buttonText,
  content,
  coverImage,
  iconImage,
  disabled,
  postId,
  authorId,
}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handlePress = () => {};

  const clickPost = () => {
    dispatch(
      setSelectedPost({
        authorId,
        title,
        subTitle,
        buttonText,
        content,
        coverImage,
        iconImage,
        disabled,
        postId,
      })
    );

    navigation.navigate('PostInteraction');
  };

  return (
    <Card elevation={0} style={style.container}>
      <TouchableOpacity onPress={clickPost}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Card.Title
              titleStyle={[
                styles.subtitle1,
                { marginLeft: 10, marginBottom: 0 },
              ]}
              subtitleStyle={[
                styles.captionBold,
                { marginLeft: 10, marginTop: -5 },
              ]}
              title={title}
              subtitle={subTitle}
              left={() => LeftContent({ iconImage })}
            />
          </View>
          {/* <View style={{ marginRight: 20 }}>
            <Text style={styles.navLabel}>00:00:00 </Text>
          </View> */}
        </View>
        {coverImage ? (
          <Card.Cover source={{ uri: coverImage }} resizeMode="cover" />
        ) : null}
        {!coverImage && <Divider />}
        <Card.Content>
          <Text
            style={[
              styles.bodyDefault,
              {
                marginTop: content && content.length ? 15 : 0,
                marginBottom: content && content.length > 0 ? 15 : 0,
              },
            ]}
          >
            {content && content.length > 80
              ? `${content.slice(0, 80)}...`
              : content}
          </Text>
        </Card.Content>
        <Card.Actions>
          {buttonText ? (
            <OrangeButton
              buttonBackgroundColor={
                disabled ? theme.colors.neutralsGrey500 : theme.colors.primary
              }
              text={buttonText}
              onPress={disabled ? null : handlePress}
            />
          ) : (
            <Text />
          )}
        </Card.Actions>
      </TouchableOpacity>
    </Card>
  );
}
