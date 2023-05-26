import React, { useState } from 'react';

import PersonalDataView from './PersonalDataView';
import useFetchUserData from '../../../../routes/hooks/useFetchUserData';
import useUpdateUserData from '../../../../routes/hooks/useUpdateUserData';

// TODO Editing Bio is not working
// TODO Editing Username is not working
// TODO Editing StudyCourse, Password is not working

/**
 * This is the main Personal Data Screen
 *
 */
export default function PersonalDataScreen() {
  const [hasChanges, setHasChanges] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const [usernameData, setUsername] = useState('');
  const [nameData, setName] = useState('');
  const [biographyData, setBiography] = useState('');
  const [studyProgramme, setStudyProgramme] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setPasswordConfirmation] = useState('');

  // const [usernameError, setUsernameError] = useState('');
  // const [nameError, setNameError] = useState('');
  // const [passwordError, setPasswordError] = useState('');
  // const [confirmError, setConfirmError] = useState('');

  const userData = useFetchUserData();
  const { updateUser } = useUpdateUserData();

  // const validateUsername = () => {
  //   const usernameRegex = /^[a-zA-Z0-9]+$/;

  //   if (!usernameRegex.test(usernameData)) {
  //     setUsernameError(
  //       'Please enter a username that contains only letters or / and numbers.'
  //     );
  //     return false;
  //   }
  //   setUsernameError('');
  //   return true;
  // };

  // const validateName = () => {
  //   const nameRegex = /^[a-zA-Z]+$/;

  //   if (!nameRegex.test(nameData)) {
  //     setNameError('Please enter a name that contains only letters.');
  //     return false;
  //   }
  //   setNameError('');
  //   return true;
  // };

  const onChangeSelectionStudyProgramme = (value) => {
    setStudyProgramme(value);
    setIsPickerOpen(true);
  };

  const handleSaveChanges = async (event) => {
    event.preventDefault();
    // const isUsernameValid = validateUsername();
    // const isNameValid = validateName();
    // const isPasswordValid = validatePassword();
    // const isPasswordConfirm = handlePasswordConfirmationChange();

    // Create an object with the updated data
    const updatedData = {
      email: userData.email,
      username: usernameData,
      name: nameData,
      biography: biographyData,
      studyCourse: studyProgramme,
    };

    try {
      // Call the updateUser function to update the data in the database
      await updateUser(updatedData);
      setHasChanges(false);

      alert('Changes have been saved.');
    } catch (error) {
      // Handle error if necessary
      console.error('Error updating user data:', error);
      throw error;
    }
  };

  const studyProgrammeList = ['BCC', 'BMT', 'SPM', 'ECM'];

  return (
    <PersonalDataView
      emailLabel={userData.email}
      // Username
      usersnameLabel={userData.username}
      usersnameValue={usernameData}
      // usernameError={usernameError}
      onChangeTextUsername={(value) => {
        setHasChanges(true);
        setUsername(value);
      }}
      // Name
      nameLabel={userData.name}
      nameValue={nameData}
      // nameError={nameError}
      onChangeTextName={(value) => {
        setHasChanges(true);
        setName(value);
      }}
      // Biography
      biographyLabel={userData.biography}
      biographyValue={biographyData}
      onChangeTextBiography={(value) => {
        setHasChanges(true);
        setBiography(value);
      }}
      // Study Programme
      studyProgrammeLabel={userData.studyProgramme}
      studyProgrammeList={studyProgrammeList}
      studyProgrammeValue={userData.studyProgramme}
      onChangeSelectionStudyProgramme={onChangeSelectionStudyProgramme}
      isPickerOpen={isPickerOpen}
      // Password
      passwordLabel="**********************"
      // onPasswordConfirmation={(value) => setPasswordConfirmation(value)}
      // confirmError={confirmError}
      onSaveChanges={handleSaveChanges}
      onChangeValuesButton={hasChanges}
    />
  );
}
