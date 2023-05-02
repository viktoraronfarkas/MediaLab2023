import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    height: 40,
    width: 40,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
  text: {
    top: 10,
    fontFamily: 'Basic Sans',
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 32,
  },
});

/// This Component represents a text, a clickable IconImage
/// You can also adjust the styling of the images accordingly (iconStyle )
///
/// EXAMPLE: <AddIconInteraction text="join me!" icon={iconImage}  />
/// import iconImage from './path/Images/iconImage'
export default function AddIconInteraction({ text, icon, iconStyle, onPress }) {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Image
            style={[styles.icon, iconStyle]}
            source={icon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.text}> {text} </Text>
      </View>
    </SafeAreaView>
  );
}
