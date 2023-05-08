import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import foodIcon from '../../../assets/food.png';
import { styles } from '../../constants/myTheme';

const style = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  commentContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  authorImage: {
    width: 30,
    height: 30,
    borderRadius: 16,
    marginRight: 5,
  },
  commentsContainer: {
    flex: 1,
  },
  commentAuthorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    marginRight: 8,
  },
  commentTextContainer: {
    marginLeft: 45,
    maxWidth: '80%', // add this line to limit the width of the comment text
  },
});

/**
 * This represents a single comment.
 *
 */
export default function SingleComment({ author, text }) {
  return (
    <View style={style.commentContainer}>
      <View style={style.commentsContainer}>
        <View style={style.commentAuthorContainer}>
          <Image source={foodIcon} style={style.authorImage} />
          <Text style={[styles.headline3, { marginLeft: 4 }]}>{author}</Text>
        </View>
        <View style={style.commentTextContainer}>
          <Text style={styles.bodyDefault}>{text}</Text>
        </View>
      </View>
    </View>
  );
}
