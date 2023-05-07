import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import SingleComment from './SingleComment';

const style = StyleSheet.create({
  container: {
    marginTop: 16,
  },
});

/**
 * This represents the comment section that is fetched from the database.
 */
export default function CommentSection() {
  // const [comments, setComments] = useState([]);

  // HERE COMES API FETCH OF USER COMMENTS

  // useEffect(() => {
  //   fetch('https://yourapi.com/comments')
  //     .then((response) => response.json())
  //     .then((data) => setComments(data))
  //     .catch((error) => console.error(error));
  // }, []);

  // Example (DELETE LATER):
  // const comments = [
  //   {
  //     author: 'John Doe',
  //     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  //   },
  //   {
  //     author: 'Jane Smith',
  //     text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  //   },
  //   // Add more comments as needed
  // ];

  return (
    <View style={style.container}>
      {comments.map((comment) => (
        <SingleComment
          key={comment.id}
          author={comment.author}
          text={comment.text}
        />
      ))}
    </View>
  );
}
