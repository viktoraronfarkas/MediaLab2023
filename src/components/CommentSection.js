import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import foodIcon from '../../assets/food.png';

const styles = StyleSheet.create({
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
    marginRight: 5
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
  commentAuthor: {
    fontSize: 14,
    color: '#5E5E5E',
    marginLeft: 4,
  },
  commentTextContainer: {
    marginLeft: 45,
    maxWidth: '80%', // add this line to limit the width of the comment text
  },
  commentText: {
    fontSize: 14,
    color: '#5E5E5E',
  },
});

function CommentSection({ comments }) {
  return (
    <View style={styles.container}>
      {comments.map((comment) => (
        <View key={comment.id} style={styles.commentContainer}>
          <View style={styles.commentsContainer}>
            <View style={styles.commentAuthorContainer}>
            <Image source={foodIcon} style={styles.authorImage} />
              <Text style={styles.commentAuthor}>{comment.author}</Text>
            </View>
            <View style={styles.commentTextContainer}>
              <Text style={styles.commentText}>{comment.text}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

export default CommentSection;

/* const comments = [
    {
        author: 'John Doe',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        author: 'Jane Smith',
        text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
      // Add more comments as needed
    ];
*/