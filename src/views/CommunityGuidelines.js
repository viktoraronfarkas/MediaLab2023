import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import { styles, theme } from '../constants/myTheme';
import heartImage from '../../assets/Images/heart-right-image.png';
import starImage from '../../assets/Images/star-image.png';

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: theme.colors.backgroundSand,
  },

  title: {
    color: theme.colors.primary,
    fontSize: 32,
    textAlign: 'center',
    alignSelf: 'center',
    paddingBottom: 20,
  },

  header: {
    paddingVertical: 20,
  },
  body: {
    paddingBottom: 10,
  },
});

/**
 * This is the Community Guidelines Page.
 * It contains only information about our community guidelines.
 *
 */
export default function CommunityGuidelines() {
  return (
    <SafeAreaView style={[style.container]}>
      <ScrollView 
          style={{
          paddingHorizontal: 15,
          paddingVertical: 15,
          margin: 20,
          backgroundColor: theme.colors.backgroundSand,
        }}
        showsVerticalScrollIndicator={false}
        >
        <Text style={[styles.headline1, style.title]}>Our Guidelines</Text>
        <Text
          style={[
            styles.bodyDefault,
            { textAlign: 'center', paddingBottom: 20 },
          ]}
        >
          Our app is built on respect, kindness, and inclusivity. We welcome all
          users to our application, and we expect everyone to follow these
          guidelines when using our platform.
        </Text>
        <Text style={[styles.headline2, style.header]}>No Hate Speech</Text>
        <Text style={[styles.bodyDefault, style.body]}>
          We do not tolerate hate speech of any kind. This includes language
          that is racist, sexist, homophobic, transphobic, ableist, or otherwise
          discriminatory. Any content or behaviour that promotes hate or
          violence against individuals or groups will not be allowed.
        </Text>
        <Text style={[styles.headline2, style.header]}>Be Respectful</Text>
        <Text style={[styles.bodyDefault, style.body]}>
          We expect all users to treat others with respect and kindness. This
          means refraining from personal attacks, harassment, bullying, or any
          other behavior that could make someone feel uncomfortable or
          unwelcome.
        </Text>
        <Text style={[styles.headline2, style.header]}>Do not Spam</Text>
        <Text style={[styles.bodyDefault, style.body]}>
          Please refrain from spamming the platform with repetitive or
          irrelevant content. This includes sending unsolicited messages or
          advertisements to other users.
        </Text>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={[styles.headline2, style.header]}>
            Report Inappropriate Content
          </Text>
          <Image
            source={heartImage}
            style={{ width: 50, height: 40 }}
          />
        </View>
        <Text style={[styles.bodyDefault, { marginBottom: 30, marginTop: 20 }]}>
          If you come across any content or behavior that violates these
          guidelines, please report it to us immediately. We will review and
          take appropriate action as necessary.
        </Text>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={[styles.headline2, style.header]}>General Rule:</Text>
          <Image
            source={starImage}
            style={{ width: 23, height: 33}}
          />
        </View>
        <Text style={[styles.bodyDefault, style.body, { paddingBottom: 30 }]}>
          If it feels wrong, it probably is. Please treat others, like you want
          to be treated.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
