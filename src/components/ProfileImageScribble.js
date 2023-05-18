import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { theme, styles } from '../constants/myTheme';
import defaultProfileImage from '../../assets/Icons/group-big-default-icon.png';
import scribbleFrame from '../../assets/Images/profile-frame.png';

const style = StyleSheet.create({
  imageUploadedContainer: {
    top: 120,
  },

  profileImage: {
    position: 'relative',
    borderColor: theme.colors.neutralsWhite,
    width: 180,
    height: 180,
    borderRadius: 100,
    borderWidth: 4,
    bottom: 40,
  },
  scribbleFrame: {
    position: 'absolute',
    alignItems: 'center',
    height: 330,
    width: 330,
    bottom: 0,
  },
});

/**
 * This represents the user profile image component.
 * It contains the scribbles around the rounded profile image. Below it displays the username.
 * A default Image is implemented.
 *
 * How to use:
 *  < ProfileImage profileImage={profileImage} username={username} />
 */
export default function ProfileImageScribble({ profileImage, username }) {
  return (
    <View style={style.imageUploadedContainer}>
      {profileImage ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image source={{ uri: profileImage }} style={style.profileImage} />
          <View style={{ bottom: 25 }}>
            <Text style={styles.subtitle1}> {username} </Text>
          </View>
          <Image
            style={[style.scribbleFrame]}
            source={scribbleFrame}
            resizeMode="contain"
          />
        </View>
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image source={defaultProfileImage} style={style.profileImage} />
          <View style={{ bottom: 25 }}>
            <Text style={styles.subtitle1}> {username} </Text>
          </View>
          <Image
            style={[style.scribbleFrame]}
            source={scribbleFrame}
            resizeMode="contain"
          />
        </View>
      )}
    </View>
  );
}
