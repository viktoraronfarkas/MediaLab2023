import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image } from 'react-native';
import { styles, theme } from '../constants/myTheme';
import BackButton from '../components/Buttons/BackButton';
import Foodshare from '../../assets/foodshare.jpg';

function SubgroupJoining() {
  const data = [
    { username: 'Nina', image: { Foodshare } },
    { username: 'John', image: { Foodshare } },
    { username: 'Emily', image: { Foodshare } },
    // Add more data as needed. Later this is dynamic
  ];
  return (
    <SafeAreaView
      style={{ backgroundColor: theme.colors.backgroundSand, flex: 1 }}
    >
      <View style={{ margin: 20 }}>
        <View style={{ marginBottom: 15, marginTop: 20 }}>
          <BackButton text="back" />
        </View>
      </View>

      <View
        style={{
          flex: 1,
          padding: 16,
          marginTop: 15,
        }}
      >
        {data.map((item, index) => (
          <View
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}
          >
            <Text style={styles.headline3}>joining</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text style={styles.headline3}>{item.username}</Text>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50 / 2,
                  overflow: 'hidden',
                  marginLeft: 10,
                }}
              >
                <Image
                  source={Foodshare}
                  style={{ flex: 1, width: null, height: null }}
                  resizeMode="cover"
                />
              </View>
            </View>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

export default SubgroupJoining;
