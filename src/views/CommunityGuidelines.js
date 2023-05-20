import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image } from 'react-native';
import { styles, theme } from '../constants/myTheme';
import BackButton from '../components/Buttons/BackButton';
import heartImage from '../../assets/Images/heart-right-image.png';
import starImage from '../../assets/Images/star-image.png';

function CommunityGuidelines() {
  return (
    <SafeAreaView
      style={{ backgroundColor: theme.colors.backgroundSand, flex: 1 }}
    >
      <View style={{ margin: 20 }}>
        <View style={{ marginBottom: 15, marginTop: 20 }}>
          <BackButton text="back" />
        </View>
        <Text
          style={[
            styles.appTitle,
            { color: theme.colors.primary, textAlign: 'center' },
          ]}
        >
          Our Guidelines
        </Text>
        <Text
          style={[
            styles.bodyDefault,
            { marginBottom: 30, marginTop: 10, textAlign: 'center' },
          ]}
        >
          Our app is built on respect, kindness, and inclusivity. We welcome all
          users to our application, and we expect everyone to follow these
          guidelines when using our platform.
        </Text>
        <Text style={[styles.headline3, { fontWeight: 'bold' }]}>
          No Hate Speech
        </Text>
        <Text style={[styles.bodyDefault, { marginBottom: 30, marginTop: 10 }]}>
          We do not tolerate hate speech of any kind. This includes language
          that is racist, sexist, homophobic, transphobic, ableist, or otherwise
          discriminatory. Any content or behaviour that promotes hate or
          violence against individuals or groups will not be allowed.
        </Text>
        <Text style={[styles.headline3, { fontWeight: 'bold' }]}>
          Be Respectful
        </Text>
        <Text style={[styles.bodyDefault, { marginBottom: 30, marginTop: 10 }]}>
          We expect all users to treat others with respect and kindness. This
          means refraining from personal attacks, harassment, bullying, or any
          other behavior that could make someone feel uncomfortable or
          unwelcome.
        </Text>
        <Text style={[styles.headline3, { fontWeight: 'bold' }]}>
          Do not Spam
        </Text>
        <Text style={[styles.bodyDefault, { marginBottom: 30, marginTop: 10 }]}>
          Please refrain from spamming the platform with repetitive or
          irrelevant content. This includes sending unsolicited messages or
          advertisements to other users.
        </Text>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={[styles.headline3, { fontWeight: 'bold' }]}>
            Report Inappropriate Content
          </Text>
          <Image
            source={heartImage}
            style={{ width: 60, height: 50, marginRight: 30 }}
          />
        </View>
        <Text style={[styles.bodyDefault, { marginBottom: 30, marginTop: 20 }]}>
          If you come across any content or behavior that violates these
          guidelines, please report it to us immediately. We will review and
          take appropriate action as necessary.
        </Text>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={[styles.headline3, { fontWeight: 'bold' }]}>
            General Rule:
          </Text>
          <Image
            source={starImage}
            style={{ width: 20, height: 30, marginLeft: 10 }}
          />
        </View>
        <Text style={[styles.bodyDefault, { marginBottom: 30 }]}>
          If it feels wrong, it probably is. Please treat others, like you want
          to be treated.
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default CommunityGuidelines;
