import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View  } from 'react-native';
import { theme } from '../constants/myTheme';
import InputField from '../components/Items/InputField';

function SearchScreen() {

  return (
    <SafeAreaView
      style={{ backgroundColor: theme.colors.backgroundSand, flex: 1 }}
    >
        <View style={{ margin: 20 }}>
            <InputField labelText="Search" padding={2} marginLeft={0} />
        </View>
      
    </SafeAreaView>
  );
}

export default SearchScreen;
