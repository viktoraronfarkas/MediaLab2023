import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

import { theme, styles } from '../../../../constants/myTheme';

import TitleArrowHeading from '../../../../components/Texts/TitleArrowHeading';
import GreyButton from '../../../../components/Buttons/GreyButton';
import OrangeButton from '../../../../components/Buttons/OrangeButton';
import InputField from '../../../../components/Items/InputField';
import LongInputField from '../../../../components/Items/LongInputField';

import arrowImage from '../../../../../assets/Images/arrow-image.png';
import dropDownIcon from '../../../../../assets/Icons/arrow-right.png';

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

  usersnameLabel,
  usersnameValue,
  onChangeTextUsersname,
  usernameError,

  nameLabel,
  nameValue,
  onChangeTextName,
  nameError,

  biographyLabel,
  biographyValue,
  onChangeTextBiography,

  studyProgrammeList,
  onChangeSelectionStudyProgramme,

  passwordLabel,
  passwordValue,
  onChangeTextPassword,
  passwordError,

  onChangeValuesButton,
}) {
  const renderDropdownIcon = () => (
    <Image source={dropDownIcon} style={style.dropdownIcon} />
  );
  return (
    <SafeAreaView style={style.container}>
      <ScrollView style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
        {/* Header */}
        <View style={{ paddingVertical: 10 }}>
          <TitleArrowHeading
            title="Personal Data"
            arrowImage={arrowImage}
            arrowStyle={{ height: 70, width: 100, bottom: 20 }}
          />
        </View>

        <View style={{marginBottom: 10}}>
          {/* User Input Data */}
          <Text style={[styles.subtitle1, {marginBottom: 5}]}>Email</Text>
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

        <View style={{marginBottom: 10}}>
          <Text style={[styles.subtitle1, {marginBottom: 5}]}>Name</Text>
          {nameError ? <Text style={style.error}>{nameError}</Text> : null}
          <InputField
            labelText={nameLabel}
            value={nameValue}
            onChangeText={onChangeTextName}
            inputStyle={{ marginTop: 10, marginBottom: 30 }}
            marginLeft={0}
          />
        </View>

        <Text style={[styles.subtitle1]}>Study Programm</Text>
        <View style={{ marginBottom: 10 }}>
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
        </View>
        <Text style={[styles.subtitle1, {marginBottom: 5}]}>Biography</Text>
        <LongInputField
          placeholderText={biographyLabel}
          value={biographyValue}
          onChangeText={onChangeTextBiography}
          inputStyle={{ marginBottom: 20 }}
        />
        <Text style={[styles.subtitle1, {marginBottom: 5}]}>Password</Text>
        {passwordError ? (
          <Text style={style.error}>{passwordError}</Text>
        ) : null}
        <InputField
          labelText={passwordLabel}
          value={passwordValue}
          onChangeText={onChangeTextPassword}
          secureTextEntry
          inputStyle={{ marginTop: 10, marginBottom: 30 }}
          marginLeft={0}
        />

        <View style={{marginTop: 15, marginBottom: 30}}>
          <Text style={[styles.subtitle1, {marginBottom: 5}]}>Username</Text>
          {usernameError ? (
            <Text style={style.error}>{usernameError}</Text>
          ) : null}
          <InputField
            labelText={usersnameLabel}
            value={usersnameValue}
            onChangeText={onChangeTextUsersname}
            marginLeft={0}
            inputStyle={{
              marginTop: 10,
              marginBottom: 30,
            }}
          />
        </View>

        {onChangeValuesButton ? (
          <OrangeButton
            text="save changes"
            styleButton={{
              alignSelf: 'center',
              width: '100%',
              marginBottom: 60,
            }}
          />
        ) : (
          <GreyButton
            text="save changes"
            styleButton={{
              alignSelf: 'center',
              width: '100%',
              marginBottom: 60,
            }}
            disabled
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
