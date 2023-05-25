import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../constants/myTheme';
import { BackSvg } from '../svgs';

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    left: 15,
  },

  text: {
    left: 10,
  },
});

/**
 * This Component represents a text, a clickable IconImage.
 * The goBack function is implemented, so it can be used in the NavigationContainer.
 * You adjust the text and the styles of the back-arrow & text.
 *
 * EXAMPLE: <BackButtonNavigationContainer text="Back" />
 * 
 * How to use inside the NavigationContainer:
       <Stack.Navigator
        screenOptions={{
          headerTintColor: theme.colors.onInfo,
          headerBackTitleVisible: false,
          headerBackImage: () => <BackButtonNavigationContainer text="back" />,
          headerStyle: {
            backgroundColor: theme.colors.backgroundSand,
            borderBottomWidth: 0,
            borderBottomColor: theme.colors.backgroundSand,
          },
        }}
      >
 */
export default function BackButtonNavigationContainer({
  text,
  containerStyles,
  styleText,
}) {
  const navigation = useNavigation();

  return (
    <View style={[style.container, containerStyles]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <BackSvg color="#000" width={35} height={35} />
      </TouchableOpacity>
      <Text style={[styles.captionBold, style.text, styleText]}>{text}</Text>
    </View>
  );
}
