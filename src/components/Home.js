import React from 'react';
import { Text, View } from 'react-native';
import {
  Provider as PaperProvider,
  Chip,
  Button,
  Card,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme, styles } from '../constants/myTheme';

export default function Home() {
  console.log(theme);
  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={styles.headlineXL}>
            Welcome to the first FH Social App
          </Text>
          <Chip onPress={() => console.log('Pressed')}>Example Chip</Chip>
          <Button
            icon="camera"
            mode="contained"
            onPress={() => console.log('Pressed')}
          >
            Press me
          </Button>
          <Card style={{ backgroundColor: 'primaryContainer' }}>
            <Card.Title
              title="Computer graphics"
              titleStyle={styles.headline3}
              subtitle="Study Group"
            />
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            <Card.Content>
              <Text style={styles.bodyDefault}>
                Heyyy, I am searching for a study group <br />
                for computer graphics
              </Text>
            </Card.Content>
            <Card.Actions>
              <Button>Cancel</Button>
              <Button>Ok</Button>
            </Card.Actions>
          </Card>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}
