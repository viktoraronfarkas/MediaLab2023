import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ImageBackground, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { styles, theme } from '../constants/myTheme';
import BackButton from '../components/Buttons/BackButton';
// import OrangeButton from '../components/Buttons/OrangeButton';
import underlineImage from '../../assets/Images/thin-underline-image.png';
import circleLineImage from '../../assets/Images/circleLine-image.png';
import UnderlineImageSmall from '../../assets/Images/under-line-image.png';
import { selectedPost } from '../redux/features/mainSlice/mainSlice';
import BottomScrollSheet from '../components/BottomScrollSheet/BottomScrollSheet';

function PostInteraction() {
  const postData = useSelector(selectedPost);
  // const refRBSheet = useRef();

  return (
    <SafeAreaView
      style={{ backgroundColor: theme.colors.backgroundSand, flex: 1 }}
    >
      {/* <BottomScrollSheet
          bottomSheetRef={refRBSheet}
          contentComponent={
            <OptionsLeaveGroupSheet
              sheetTitle={`Delete Post?`}
              leaveText="Yes"
              cancelText="Nevermind"
              onCancel={() => {
                refRBSheet.current.close(); // Close the bottom sheet
              }}
              onLeave={() => {
                unsubscribeFromSubGroup();
              }}
            />
          }
        /> */}
      <View style={{ margin: 20 }}>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={[styles.headline1, { textAlign: 'center' }]}>
            {postData.title}
          </Text>
          <Image source={underlineImage} style={{ width: 340, height: 30 }} />
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 80,
            }}
          >
            <Text style={[styles.headline3]}>DisplayName</Text>
            {/* <Text style={[styles.headline2]}>{postData.subTitle}</Text> */}
            <Image
              source={UnderlineImageSmall}
              style={{
                width: 120,
                height: 8,
              }}
            />
          </View>
          <ImageBackground
            source={circleLineImage}
            style={{
              width: 120,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={[styles.headline3]}>15:30</Text>
          </ImageBackground>
        </View>
        <Text style={[styles.bodyDefault, { marginTop: 50, paddingHorizontal: 20 }]}>
          {postData.content}
        </Text>

        {/* <OrangeButton text="Join Event" style={{ marginTop: 20 }} /> */}

        {/* <View style={{ flexDirection: 'row', marginTop: 80 }}>
          <Text style={[styles.headline3]}>Organised by:</Text>
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
            >
              <Image
                source={Foodshare}
                style={{ flex: 1, width: null, height: null }}
                resizeMode="cover"
              />
            </View>
            <Text
              style={[styles.subtitle1, { marginLeft: 10, marginBottom: 5 }]}
            >
              Username
            </Text>
          </View>
        </View> */}

        {/* <View style={{ flexDirection: 'row', marginTop: 30 }}>
          <Text style={[styles.headline3]}>People joining:</Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={[styles.subtitle1, { marginLeft: 10 }]}>33</Text>
          </View>
        </View> */}
      </View>
    </SafeAreaView>
  );
}

export default PostInteraction;
