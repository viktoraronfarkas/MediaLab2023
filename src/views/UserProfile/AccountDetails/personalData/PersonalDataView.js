import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Platform,
  KeyboardAvoidingView,
  // Image,
} from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker'; // For Birthday
import DialogAction from '../../../../components/Dialogs/DialogAction';
import { theme, styles } from '../../../../constants/myTheme';
import TitleArrowHeading from '../../../../components/Texts/TitleArrowHeading';
import GreyButton from '../../../../components/Buttons/GreyButton';
import OrangeButton from '../../../../components/Buttons/OrangeButton';
import InputField from '../../../../components/Items/InputField';
import LongInputField from '../../../../components/Items/LongInputField';
import arrowImage from '../../../../../assets/Images/arrow-image.png';
// import SelectDropdown from 'react-native-select-dropdown'; // For Study Programme Selection
// import dropDownIcon from '../../../../../assets/Icons/arrow-right.png'; // For Study Programme Selection

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.colors.backgroundSand,
  },
  picker: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
  },
  error: {
    color: theme.colors.primary,
    width: '50%',
    marginTop: 30,
    marginBottom: 15,
  },
  dropdownStyle: {
    backgroundColor: theme.colors.backgroundSand,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  dropdownButtonStyle: {
    backgroundColor: theme.colors.backgroundWhite,
    marginTop: 10,
    width: '100%',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  dropdownIcon: {
    width: 40,
    height: 40,
    transform: [{ rotate: '90deg' }],
  },
});
/**
 * This is the main Personal Data View
 */
export default function PersonalDataView({
  emailLabel,
  onBlur,

  usernameValue,
  onChangeTextUsername,
  usernameError,

  nameValue,
  onChangeTextName,
  nameError,

  biographyValue,
  onChangeTextBiography,

  // studyProgrammeList,
  // onChangeSelectionStudyProgramme,

  passwordValue,
  passwordLabel,
  onChangeTextPassword,
  passwordError,

  alertVisible,
  onPressCancelDialog,

  // openDatePicker,
  // showDatePicker,
  // formattedDate,
  // birthdayValue,
  // handleDateChange,
  // applyChangesAndClose,

  onSaveChanges,
  onChangeValuesButton,
}) {
  // const renderDropdownIcon = () => (
  //   <Image source={dropDownIcon} style={style.dropdownIcon} />
  // );
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={style.container}>
        <ScrollView style={{ paddingHorizontal: 15 }}>
          {/* Header */}
          <View style={{ paddingTop: 30 }}>
            <TitleArrowHeading
              title="Personal Data"
              arrowImage={arrowImage}
              arrowStyle={{ height: 70, width: 100, bottom: 20 }}
            />
          </View>

          <View style={{ marginBottom: 10 }}>
            {/* User Input Data */}
            <Text style={[styles.subtitle1, { marginBottom: 5 }]}>Email</Text>
            <InputField
              labelText={emailLabel}
              editable={false} // disabled, user should not edit this
              inputStyle={{
                marginTop: 10,
                marginBottom: 30,
                backgroundColor: theme.colors.backgroundCamel,
              }}
              marginLeft={0}
            />
          </View>

          <Text style={styles.subtitle1}>Full Name</Text>
          {nameError ? <Text style={style.error}>{nameError}</Text> : null}
          <InputField
            onBlur={onBlur}
            value={nameValue}
            onChangeText={onChangeTextName}
            inputStyle={{ marginTop: 10, marginBottom: 30 }}
            marginLeft={0}
          />

          {/*    <Text style={styles.subtitle1}>Study Programme</Text>
          <View style={{ paddingBottom: 30 }}>
            <SelectDropdown
              data={studyProgrammeList}
              onSelect={(selectedItem) => {
                onChangeSelectionStudyProgramme(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem) => selectedItem}
              rowTextForSelection={(item) => item}
              dropdownIconPosition="right"
              dropdownStyle={style.dropdownStyle}
              buttonStyle={style.dropdownButtonStyle}
              renderDropdownIcon={renderDropdownIcon}
              st
            />
          </View> */}

          <Text style={styles.subtitle1}>Password</Text>
          {passwordError ? (
            <Text style={style.error}>{passwordError}</Text>
          ) : null}
          <InputField
            onBlur={onBlur}
            labelText={passwordLabel}
            value={passwordValue}
            onChangeText={onChangeTextPassword}
            secureTextEntry
            editable={false} // disabled, until function is ready
            inputStyle={{
              marginTop: 10,
              marginBottom: 30,
              backgroundColor: theme.colors.backgroundCamel,
            }}
            marginLeft={0}
          />

          <Text style={styles.subtitle1}>Displayed Name</Text>
          {usernameError ? (
            <Text style={style.error}>{usernameError}</Text>
          ) : null}
          <InputField
            onBlur={onBlur}
            value={usernameValue}
            onChangeText={onChangeTextUsername}
            inputStyle={{ marginTop: 10, marginBottom: 30 }}
            marginLeft={0}
          />

          {/* <Text style={styles.subtitle1}>Birthday</Text>
          {showDatePicker && (
            <View>
              <DateTimePicker
                value={birthdayValue}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateChange}
              />
              <OrangeButton
                text="Apply Changes"
                onPress={applyChangesAndClose}
                styleButton={{ marginBottom: 20 }}
              />
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <InputField
              value={formattedDate}
              onChangeText={handleDateChange}
              inputStyle={{ marginTop: 10, marginBottom: 30 }}
              marginLeft={0}
              editable={false}
            />

            <OrangeButton
              text="Edit"
              onPress={openDatePicker}
              styleButton={{ marginBottom: 20 }}
            />
          </View> */}

          <Text style={styles.subtitle1}>Biography</Text>
          <LongInputField
            value={biographyValue}
            onChangeText={onChangeTextBiography}
            inputStyle={{ marginBottom: 30, marginTop: 10 }}
          />

          {/* When Save: show this dialog  */}
          <View>
            <DialogAction
              containerStyle={{
                marginTop: 'auto', 
                marginBottom: 'auto', 
                marginHorizontal: 15,
                paddingRight: 20,
              }}
              actions={[{ id: 1, text: 'Close', onPress: onPressCancelDialog }]}
              visible={alertVisible}
              text="Changes have been saved!"
              isDialog
            />
          </View>

          {onChangeValuesButton ? (
            <OrangeButton
              text="save changes"
              onPress={onSaveChanges}
              styleButton={{
                alignSelf: 'center',
                width: '100%',
                marginBottom: 60,
                marginTop: 60,
              }}
            />
          ) : (
            <GreyButton
              text="save changes"
              styleButton={{
                alignSelf: 'center',
                width: '100%',
                marginBottom: 60,
                marginTop: 60,
              }}
              onPress={!onSaveChanges}
              disabled
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
