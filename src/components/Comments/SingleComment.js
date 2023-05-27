import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { styles } from '../../constants/myTheme';

const style = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  commentContainer: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  authorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 5,
  },
  commentsContainer: {
    flex: 1,
  },
  commentAuthorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    marginRight: 8,
  },
  commentTextContainer: {
    marginLeft: 55,
    maxWidth: '80%', // add this line to limit the width of the comment text
  },
});

/**
 * This represents a single comment.
 *
 */
export default function SingleComment({ author, text, authorImage, publishedDate }) {
  return (
    <View style={style.commentContainer}>
      <View style={style.commentsContainer}>
        <View style={style.commentAuthorContainer}>
          <Image source={authorImage} style={style.authorImage} />
          <Text style={[styles.headline3, { marginLeft: 4 }]}>{author}</Text>
          <Text style={[styles.overline, {marginLeft: 5}]}>{publishedDate}</Text>
        </View>
        <View style={style.commentTextContainer}>
          <Text style={styles.bodyDefault}>{text}</Text>
        </View>
      </View>
    </View>
  );
}
