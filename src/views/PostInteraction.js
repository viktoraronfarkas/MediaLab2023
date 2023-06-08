import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, ScrollView, } from 'react-native';
import { useSelector } from 'react-redux';
import { styles, theme } from '../constants/myTheme';
import OrangeButton from '../components/Buttons/OrangeButton';
import underlineImage from '../../assets/Images/thin-underline-image.png';
import { selectedPost } from '../redux/features/mainSlice/mainSlice';

function PostInteraction() {
  const postData = useSelector(selectedPost);
  // const refRBSheet = useRef();

  return (
    <SafeAreaView
      style={{ backgroundColor: theme.colors.backgroundSand, flex: 1 }}
    >
      <ScrollView>
        <View style={{ margin: 20 }}>
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={[styles.headline1, { textAlign: 'center' }]}>
              {postData.title}
            </Text>
            <Image source={underlineImage} style={{ width: 340, height: 30 }} />
          </View>
          <Text style={[styles.bodyDefault, { marginTop: 50, paddingHorizontal: 20 }]}>
            {postData.content}
          </Text>


          <View style={{ flexDirection: 'row', marginTop: 80, justifyContent: 'center', }}>
            <Text style={[styles.headline3]}>created by:</Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50 / 2,
                  overflow: 'hidden',
                  marginLeft: 5,
                  marginTop: -10,
                }}
              />
              <Text
                style={[styles.subtitle1, { marginLeft: 10, marginBottom: 5 }]}
              >
                Username
              </Text>
            </View>
          </View> 
          <View style={{ marginTop: 30}}>
            <View>
              <Text style={[styles.subtitle1, { marginLeft: 10, marginBottom: 5, color: theme.colors.primary }]}>
                Displayed Name
              </Text>
              <Text style={[styles.bodyDefault, { marginLeft: 10, marginBottom: 20 }]}>
                Name
              </Text>
            </View>

            <View>
              <Text  style={[styles.subtitle1, { marginLeft: 10, marginBottom: 5, color: theme.colors.primary }]}>
                Full Name
              </Text>
              <Text style={[styles.bodyDefault, { marginLeft: 10, marginBottom: 20 }]}>
                Name
              </Text>
            </View>


            <View>
              <Text  style={[styles.subtitle1, { marginLeft: 10, marginBottom: 5, color: theme.colors.primary }]}>
                Email
              </Text>
              <Text style={[styles.bodyDefault, { marginLeft: 10, marginBottom: 20 }]}>
                test.test@fhstp.ac.at
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 50 }}>
          <OrangeButton
              text="Delete"
              styleButton={{ alignSelf: 'center', width: '30%' }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default PostInteraction;
