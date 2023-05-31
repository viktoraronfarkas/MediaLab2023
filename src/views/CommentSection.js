import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, StyleSheet, ScrollView  } from 'react-native';
import { styles, theme } from '../constants/myTheme';
import BackButton from '../components/Buttons/BackButton';
import underlineImage from '../../assets/Images/thin-underline-image.png';
import SingleComment from '../components/Comments/SingleComment';
import foodIcon from '../../assets/food.png';
import InputField from '../components/Items/InputField'
import SendIcon from '../../assets/Icons/send-icon.png'

const style = StyleSheet.create({
    inputContainer: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        backgroundColor: theme.colors.backgroundCamel,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 20,
        paddingTop: 10
      },
      sendButton: {
        marginLeft: 30,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
      },
})

function CommentSection() {
    const comments = [
        { id: 1, author: 'Nina', authorImage: foodIcon, text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam', publishedDate:'19.03.2023'},
        { id: 2, author: 'Paul', authorImage: foodIcon, text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', publishedDate:'20.03.2023'},
        { id: 3, author: 'Nina', authorImage: foodIcon, text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam', publishedDate:'20.03.2023'},
        { id: 4, author: 'Paul', authorImage: foodIcon, text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam', publishedDate:'21.03.2023'},
        { id: 5, author: 'Mark', authorImage: foodIcon, text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam', publishedDate:'22.03.2023'},
        { id: 6, author: 'Nina', authorImage: foodIcon, text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam', publishedDate:'22.03.2023'},
        { id: 7, author: 'Mark', authorImage: foodIcon, text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam ', publishedDate:'23.03.2023'},

        // Later with Real Data
      ];
  return (
    <SafeAreaView
      style={{ backgroundColor: theme.colors.backgroundSand, flex: 1 }}
    >
      <View style={{ margin: 20 }}>
        <View style={{ marginBottom: 15, marginTop: 20 }}>
          <BackButton text="back" />
        </View>
        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <Text style={[styles.headline1, { textAlign: 'center' }]}>
            (Title)
          </Text>
          <Image source={underlineImage} style={{ width: 340, height: 30 }} />
        </View>

        <Text style={[styles.bodyDefault, { marginTop: 30 }]}>
          (Info of the Post)
        </Text>

        <ScrollView style={{ marginTop: 30, flex: 1}}>
            {comments.map((comment) => (
                <SingleComment 
                key={comment.id}
                author={comment.author} 
                text={comment.text} 
                authorImage={comment.authorImage}
                style={{marginBottom: 30}}
                publishedDate={comment.publishedDate}
                />
            ))}
            <View style={{ height: 70}}/>
        </ScrollView>

        <View style={style.inputContainer}>
            <InputField
            placeholderText="Write something here..." padding={0}
            />
            <Image source={SendIcon} style={style.sendButton} />
        </View>


      </View>
    </SafeAreaView>
  );
}

export default CommentSection;
