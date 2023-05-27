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
 *
 */
export default function PersonalDataScreen() {
  const [hasChanges, setHasChanges] = useState(false);
  // const [isPickerOpen, setIsPickerOpen] = useState(false);
  const dispatch = useDispatch();
  const [usernameData, setUsername] = useState('');
  const [nameData, setName] = useState('');
  const [biographyData, setBiography] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  // const [studyProgramme, setStudyProgramme] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setPasswordConfirmation] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [nameError, setNameError] = useState('');
  // const [passwordError, setPasswordError] = useState('');
  // const [confirmError, setConfirmError] = useState('');

  const userData = useFetchUserData();
  useEffect(() => {
    dispatch(setCurrentUser(userData));
  }, []);
  const currentUser = useSelector(selectedUser);
  const { updateUser } = useUpdateUserData();

  const validateUsername = () => {
    const usernameRegex = /^[a-zA-Z0-9]+$/;

    if (
      usernameData !== currentUser.username &&
      !usernameRegex.test(usernameData)
    ) {
      setUsernameError(
        'Please enter a username that contains only letters and/or numbers.'
      );
      return false;
    }
    setUsernameError('');
    return true;
  };

  const validateName = () => {
    const nameRegex = /^[a-zA-Z]+$/;

    if (nameData !== currentUser.name && !nameRegex.test(nameData)) {
      setNameError('Please enter a name that contains only letters.');
      return false;
    }
    setNameError('');
    return true;
  };

  // const onChangeSelectionStudyProgramme = (value) => {
  //   setStudyProgramme(value);
  //   setIsPickerOpen(true);
  // };

  const handleSaveChanges = async (event) => {
    const isUsernameValid = !usernameData || validateUsername();
    const isNameValid = !nameData || validateName();

    if (isUsernameValid && isNameValid) {
      event.preventDefault();
      // const isUsernameValid = validateUsername();
      // const isNameValid = validateName();
      // const isPasswordValid = validatePassword();
      // const isPasswordConfirm = handlePasswordConfirmationChange();

      // Create an object with the updated data
      const updatedData = {
        email: currentUser.email,
        username: usernameData || currentUser.username,
        name: nameData || currentUser.name,
        biography: biographyData || currentUser.biography,
        // studyCourse: studyProgramme,
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
    }
  };

  return (
    <PersonalDataView
      emailLabel={currentUser.email}
      // Username
      usernameLabel={currentUser.username}
      usernameValue={usernameData}
      usernameError={usernameError}
      onChangeTextUsername={(value) => {
        setHasChanges(true);
        setUsername(value);
      }}
      // Name
      nameLabel={currentUser.name}
      nameValue={nameData}
      nameError={nameError}
      onChangeTextName={(value) => {
        setHasChanges(true);
        setName(value);
      }}
      // Biography
      biographyLabel={currentUser.biography}
      biographyValue={biographyData}
      onChangeTextBiography={(value) => {
        setHasChanges(true);
        setBiography(value);
      }}
      // Study Programme
      // studyProgrammeLabel={userData.studyProgramme}
      // studyProgrammeList={studyProgrammeList}
      // studyProgrammeValue={userData.studyProgramme}
      // onChangeSelectionStudyProgramme={onChangeSelectionStudyProgramme}
      // isPickerOpen={isPickerOpen}
      // Password
      passwordLabel="**********************"
      editBirthday={() => setOpen(true)}
      openDatePicker={open}
      setDate={date}
      confirmNewDate={() => {
        setOpen(false);
        setDate(date);
      }}
      cancelDatePicker={() => {
        setOpen(false);
      }}
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
