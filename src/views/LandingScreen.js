import React from 'react';
import { View, Text, SafeAreaView, Image } from 'react-native';
import { styles, theme } from '../constants/myTheme';
import OrangeButton from '../components/Buttons/OrangeButton';

function StartingScreenHeadline() {
  return <Image
      style={{ height: 350, width: 350 }}
      source={require('../../assets/Images/starting-screen-headline.svg')}
    />
}

function LandingScreen() {
  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.backgroundSand, flex: 1 }}>
        <View style={{ margin: 20 }}>

            <View style={{ marginTop: 50, alignItems:'center'}}>
                <Text style={[styles.headline1, { textAlign: 'center' }]}>
                    UASYNC
                </Text>
            </View>

            <View style={{ alignItems:'center' }}>
                <StartingScreenHeadline />
            </View>

            <View style={{ marginTop: 40, marginBottom: 10, alignItems:'center'}}>
                <Text style={ styles.headline1 }>
                    Register Below:
                </Text>
            </View>

            <View style={{ alignItems:'center'}}>
                <Text style={[styles.bodyDefault, { textAlign: 'center' }]}>
                    Weit hinten, hinter den Wortbergen, fern der Länder Vokalien und Konsonantien leben die Blindtexte.
                </Text>
            </View>

            <View style={{ marginTop: 40 }}>
                <OrangeButton text="Register!"  styleButton={{  alignSelf: 'center', width: '100%' }}  />
            </View>

            <View style={{ marginTop: 20, marginBottom: 20 }}>
                <OrangeButton text="Login!"  styleButton={{  alignSelf: 'center', width: '100%' }}  />
            </View>
            
        </View>
    </SafeAreaView>

  );
}




export default LandingScreen;