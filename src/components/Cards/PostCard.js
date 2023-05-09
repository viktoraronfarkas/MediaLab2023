import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { theme, styles } from '../../constants/myTheme';
import OrangeButton from '../Buttons/OrangeButton';
import IconImageDefault from '../../../assets/Icons/group-default-icon.png';

const style = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: theme.colors.backgroundWhite,
  },
});

function LeftContent({ iconImage }) {
  return (
    <>
      {iconImage ? (
        <Image
          style={{
            width: 55,
            height: 55,
            borderRadius: 35,
          }}
          source={iconImage}
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
      )}
    </>
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
}) {
  return (
    <Card elevation={0} style={style.container}>
      <Card.Title
        titleStyle={[styles.subtitle1, { marginLeft: 10 }]}
        subtitleStyle={[styles.caption, { marginLeft: 10 }]}
        title={title}
        subtitle={subTitle}
        left={() => LeftContent({ iconImage })}
      />
      {coverImage ? (
        <Card.Cover
          source={coverImage}
          resizeMode="cover"
          style={{ borderRadius: 0 }}
        />
      ) : null}
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
          {content}
        </Text>
      </Card.Content>
      <Card.Actions>
        <OrangeButton text={buttonText}></OrangeButton>
      </Card.Actions>
    </Card>
  );
}
