import React from 'react';
import { View, StyleSheet } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
// import UserReportBottomSheet from './UserReportBottomSheet';

import { theme } from '../../constants/myTheme';

const style = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: theme.colors.backgroundSand,
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
  },
});

/**
 * This is the bottom sheet that scrolls up when an action happens (button click).
 * 
 * How to use:
 * 
 *  const refRBSheet = useRef();
 *   const openBottomSheet = () => {refRBSheet.current.open()};
 *   <BottomScrollSheet
          bottomSheetRef={ openBottomSheet }
          contentComponent={ <YourViewComponent /> }
      />
 * 
 */
export default function BottomScrollSheet({
  bottomSheetRef,
  contentComponent,
}) {
  return (
    <View>
      <RBSheet
        ref={bottomSheetRef}
        height={400}
        animationType="fade"
        closeOnDragDown
        customStyles={{
          wrapper: {
            backgroundColor: theme.colors.neutralsGrey800,
          },
          container: style.container,
          draggableIcon: {
            backgroundColor: theme.colors.neutralsGrey800,
          },
        }}
      >
        {/* Making this a dynamic component to add any kind of content inside the Bottom Sheet */}
        {contentComponent}
      </RBSheet>
    </View>
  );
}
