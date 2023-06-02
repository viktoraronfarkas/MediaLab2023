import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PersonalDataView from './PersonalDataView';
import useFetchUserData from '../../../../routes/hooks/useFetchUserData';
import useUpdateUserData from '../../../../routes/hooks/useUpdateUserData';
import {
  setCurrentUser,
  selectedUser,
} from '../../../../redux/features/mainSlice/mainSlice';

// TODO Editing StudyCourse, Password is not working
/**
 * This is the main Personal Data Screen
 */
export default function PersonalDataScreen() {
  const [hasChanges, setHasChanges] = useState(false);
  const { userData, studyCourses } = useFetchUserData();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectedUser);
  const [usernameData, setUsername] = useState(currentUser.username);
  const [nameData, setName] = useState(currentUser.name);
  const [biographyData, setBiography] = useState(currentUser.biography);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [birthday, setSelectedDate] = useState(
    new Date(currentUser.birthday) ?? new Date(1, 1, 1900)
  );
  const [dialogVisible, setDialogVisible] = useState(false);
  // const [isPickerOpen, setIsPickerOpen] = useState(false);
  // const [studyProgramme, setStudyProgramme] = useState(currentUser.studyCourse);

  // const studyProgrammeList = ['Bcc', 'BMT'];
  // const studyProgrammeList = currentUser.studyProgramme.st;
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setPasswordConfirmation] = useState('');

  // INPUT ERROR HANDLING
  const [usernameError, setUsernameError] = useState('');
  const [nameError, setNameError] = useState('');
  // const [passwordError, setPasswordError] = useState('');
  // const [confirmError, setConfirmError] = useState('');

  useEffect(() => {
    dispatch(setCurrentUser(userData));
  }, []);
  const { updateUser } = useUpdateUserData();

  const validateUsername = () => {
    const usernameRegex = /^[a-zA-Z0-9]+$/;

    if (!usernameData || usernameData === currentUser.username) {
      // Empty or unchanged name
      setNameError('');
      return true;
    }

    if (!usernameRegex.test(usernameData)) {
      // Invalid username format
      setUsernameError(
        'Please enter a username that contains only letters and/or numbers.'
      );
      return false;
    }
    // Valid username
    setUsernameError('');
    return true;
  };

  const validateName = () => {
    const nameRegex = /^[a-zA-Z]+$/;

    if (!nameData || nameData === currentUser.name) {
      // Empty or unchanged name
      setNameError('');
      return true;
    }
    if (!nameRegex.test(nameData)) {
      // Invalid name format
      setNameError('Please enter a name that contains only letters.');
      return false;
    }
    // Valid name
    setNameError('');
    return true;
  };

  const handleDateChange = async (value, selected) => {
    if (selected) {
      // Convert selected value to Date object
      const selectedDate = new Date(selected);
      setSelectedDate(selectedDate);
      setHasChanges(true);
    }
  };

  // const onChangeSelectionStudyProgramme = () => {
  //   setStudyProgramme(value);
  //   setIsPickerOpen(true);
  // };

  const handleSaveChanges = async (event) => {
    const isUsernameValid = !usernameData || validateUsername();
    const isNameValid = !nameData || validateName();

    if (isUsernameValid && isNameValid) {
      event.preventDefault();

      // Create an object with the updated data
      const updatedData = {
        email: currentUser.email,
        username: usernameData || currentUser.username,
        name: nameData || currentUser.name,
        biography: biographyData || currentUser.biography,
        birthday: birthday.toISOString() || currentUser.birthday,
        // studyProgramme: studyProgramme || currentUser.studyProgramme,
      };

      // Call the updateUser function to update the data in the database
      try {
        await updateUser(updatedData);
        setHasChanges(false);
        dispatch(setCurrentUser(updatedData));
        setDialogVisible(true);
      } catch (error) {
        // Handle error if necessary
        console.error('Error updating user data:', error);
        throw error;
      }
      console.log(updatedData);
    }
  };

  return (
    <PersonalDataView
      emailLabel={currentUser.email}
      onBlur={() => {
        validateName();
        validateUsername();
      }}
      // Username
      usernameValue={usernameData}
      usernameError={usernameError}
      onChangeTextUsername={(value) => {
        if (value !== usernameData) {
          setHasChanges(true);
          setUsername(value);
        }
      }}
      // Name
      nameValue={nameData}
      nameError={nameError}
      onChangeTextName={(value) => {
        if (value !== nameData) {
          setHasChanges(true);
          setName(value);
        }
      }}
      // Biography
      biographyValue={biographyData}
      onChangeTextBiography={(value) => {
        if (value !== biographyData) {
          setHasChanges(true);
          setBiography(value);
        }
      }}
      // Study Programme
      studyProgrammeList={studyCourses}
      studyProgrammeValue={userData.studyProgramme}
      // onChangeSelectionStudyProgramme={onChangeSelectionStudyProgramme}
      // isPickerOpen={isPickerOpen}
      // Birthday
      openDatePicker={() => {
        setShowDatePicker(true);
      }}
      showDatePicker={showDatePicker}
      formattedDate={birthday.toLocaleDateString()} // InputField Text as String
      birthdayValue={birthday} // Value for the DatePicker
      handleDateChange={handleDateChange}
      applyChangesAndClose={() => {
        setShowDatePicker(false);
      }}
      // Password
      passwordLabel="**********************"
      // onPasswordConfirmation={(value) => setPasswordConfirmation(value)}
      // confirmError={confirmError}
      alertVisible={dialogVisible}
      onPressCancelDialog={() => {
        setDialogVisible(false);
      }}
      onSaveChanges={handleSaveChanges}
      onChangeValuesButton={hasChanges}
    />
  );
}
