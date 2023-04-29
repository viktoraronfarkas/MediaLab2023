import React from 'react';
import { Text, View } from 'react-native';
import { Provider as PaperProvider, Chip, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../constants/myTheme';

export default function Home() {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text
            style={{
              fontSize: 28,
              textAlign: 'center',
              color: theme.colors.primary,
            }}
          >
            Welcome to the first FH Social App
          </Text>
          <Chip icon="information" onPress={() => console.log('Pressed')}>
            Example Chip
          </Chip>
          <Button
            icon="camera"
            mode="contained"
            onPress={() => console.log('Pressed')}
          >
            Press me
          </Button>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}
