import { StyleSheet } from 'react-native';
import { MD3LightTheme, configureFonts } from 'react-native-paper';

// NEW
// Nunito is now the basic font throughout the app
const baseFont = {
  fontFamily: 'Nunito',
};

const baseVariants = configureFonts({ config: baseFont });
// this doesn't apply correctly
const customVariants = {
  // Customize individual base variants:
  displayMedium: {
    ...baseVariants.displayMedium,
    fontFamily: 'Basic Sans',
  },
};

const fonts = configureFonts({
  config: {
    ...baseVariants,
    ...customVariants,
  },
});

export const theme = {
  ...MD3LightTheme,
  fonts,
  colors: {
    ...MD3LightTheme.colors,
    primary: 'rgb(243, 79, 52)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(255, 255, 255)',
    onPrimaryContainer: 'rgb(18, 18, 18)',
    secondary: 'rgb(0, 80, 151)',
    secondaryContainer: 'rgb(243, 79, 52)',
    onSecondaryContainer: 'rgb(255, 255, 255)',
    error: 'rgb(243, 173, 52)',
    onError: 'rgb(18, 18, 18)',
    success: 'rgb(52, 243, 77)',
    onSuccess: 'rgb(18, 18, 18)',
    info: 'rgb(52, 218, 243)',
    onInfo: 'rgb(18, 18, 18)',
    attention: 'rgb(243, 52, 122)',
    onAttention: 'rgb(18, 18, 18)',
    background: 'rgb(223, 218, 211)',
    surface: 'rgb(255, 255, 255)',
    onSurface: 'rgb(18, 18, 18)',
    surfaceVariant: 'rgb(255, 255, 255)',
    backgroundWhite: 'rgb(255, 255, 255)',
    onBackgroundWhite: 'rgb(18, 18, 18)',
    backgroundSand: 'rgb(245, 241, 236)',
    onBackgroundSand: 'rgb(18, 18, 18)',
    backgroundCamel: 'rgb(223, 218, 211)',
    onBackgroundCamel: 'rgb(18, 18, 18)',
    onBackgroundCamelSandColor: 'rgb(243, 79, 52)',
    neutralsWhite: 'rgb(255, 255, 255)',
    neutralsGrey300: 'rgb(224, 224, 224)',
    neutralsGrey500: 'rgb(158, 158, 158)',
    neutralsGrey800: 'rgb(98, 98, 98)',
    neutralsDark: 'rgb(50, 50, 50)',
    neutralsBlack: 'rgb(0, 0, 0)',
  },
};

// here are all the styles for the fonts pls see Home.js (line 20) for applying style
export const styles = StyleSheet.create({
  headlineXL: {
    fontSize: 64,
    color: theme.colors.primary,
    fontFamily: 'Basic Sans Bold',
    lineHeight: 40,
    letterSpacing: 0.0,
  },
  appTitle: {
    fontSize: 40,
    fontFamily: 'Basic Sans Bold',
  },

  headline1: {
    fontSize: 32,
    fontFamily: 'Basic Sans Bold',
    lineHeight: 40,
    letterSpacing: 0.0,
  },
  headline2: {
    fontSize: 28,
    fontFamily: 'Basic Sans Bold',
    lineHeight: 36,
    letterSpacing: 0.0,
  },
  headline3: {
    fontSize: 24,
    fontFamily: 'Basic Sans SemiBold',
    lineHeight: 32,
    letterSpacing: 0.0,
  },
  subtitle1: {
    fontSize: 20,
    fontFamily: 'Basic Sans SemiBold',
    lineHeight: 24,
    letterSpacing: 0.0,
  },
  subtitle2: {
    fontSize: 18,
    fontFamily: 'Basic Sans SemiBold',
    lineHeight: 21.6,
    letterSpacing: 0.0,
  },
  bodyDefault: {
    fontSize: 17,
    fontFamily: 'Nunito-Regular',
    lineHeight: 23.2,
    letterSpacing: 0.0,
  },
  caption: {
    fontSize: 17,
    fontFamily: 'Nunito-Regular',
    lineHeight: 23.2,
    letterSpacing: 0.0,
  },
  captionBold: {
    fontSize: 17,
    fontFamily: 'Nunito-Bold',
    lineHeight: 32,
  },
  overline: {
    fontSize: 11,
    fontFamily: 'Nunito-Regular',
    lineHeight: 15,
    letterSpacing: 0.0,
  },
  button: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    lineHeight: 21.8,
    letterSpacing: 0.0,
  },
  textLink: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    lineHeight: 21.8,
    letterSpacing: 0.0,
  },
  navLabel: {
    fontSize: 12,
    fontFamily: 'Nunito-Regular',
    lineHeight: 16,
    letterSpacing: 0.5,
  },
});
