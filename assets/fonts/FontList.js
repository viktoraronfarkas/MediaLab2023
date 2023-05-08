import * as Font from 'expo-font';

async function loadFonts() {
  await Font.loadAsync({
    'Basic Sans SemiBold': require('./SemiBold.ttf'),
    'Basic Sans Bold': require('./Bold.ttf'),
    'Nunito-Regular': require('./Nunito-Regular.ttf'),
    'Nunito-SemiBold': require('./Nunito-SemiBold.ttf'),
    'Nunito-Bold': require('./Nunito-Bold.ttf'),
  });
}

export default loadFonts;
