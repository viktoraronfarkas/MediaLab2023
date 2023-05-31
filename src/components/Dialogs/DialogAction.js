import React from 'react';
import { Modal, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import GreyButton from '../Buttons/GreyButton';
import { theme, styles } from '../../constants/myTheme';

const style = StyleSheet.create({
  backgroundColor: {
    flex: 1,
    backgroundColor: '#0000007A',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingVertical: 30,
    paddingHorizontal: 30,
    borderRadius: 12,
    backgroundColor: theme.colors.backgroundCamel,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    borderRadius: 28,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginHorizontal: 8,
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
  },

  dialog: {
    backgroundColor: theme.colors.backgroundCamel,
    borderRadius: 8,
    padding: 12,
  },
});

/**
 * This Component represents a dialog information with action buttons.
 * The buttons can be dynamically added or removed.
 * There is also an optionalButton (can be used for "Cancel, for example")
 * 
 * How to use it:
 * 
 * <DialogAction
    text="Do you want to delete this item? "
    isDialog
    actions={[
     { id: 1, text: 'Edit', onPress: onPressEdit },
     { id: 2, text: 'Delete', onPress: onPressDelete },
     ]}
      optionalButtonText="Cancel"
      onPressOptionalButton={onPressCancelDialog}
    />
 */
export default function DialogAction({
  visible,
  containerStyle,
  text,
  subText,
  isDialog,
  actions,
  optionalButtonText,
  onPressOptionalButton,
}) {
  return (
    <Modal visible={visible} transparent>
      <View style={StyleSheet.absoluteFill}>
        <View style={style.backgroundColor}>
          <View style={[style.container, containerStyle]}>
            <Text
              style={[
                styles.subtitle1,
                { textAlign: 'center' },
                isDialog && style.dialog,
              ]}
            >
              {text}
            </Text>
            <Text
              style={[
                styles.bodyDefault,
                { textAlign: 'center' },
                isDialog && style.dialog,
              ]}
            >
              {subText}
            </Text>
            <View style={style.buttonRow}>
              {actions.map((action) => (
                <TouchableOpacity
                  key={action.id}
                  style={style.buttonContainer}
                  onPress={action.onPress}
                >
                  <Text
                    style={[
                      styles.button,
                      { color: theme.colors.neutralsWhite },
                    ]}
                  >
                    {action.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {optionalButtonText && (
              <GreyButton
                text={optionalButtonText}
                styleButtonContainer={{ alignSelf: 'flex-end', top: 10 }}
                onPress={onPressOptionalButton}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}
