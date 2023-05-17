import React, { useState } from 'react';

import PersonalDataView from './PersonalDataView';

/**
 * This is the main Personal Data Screen
 *
 */
export default function PersonalDataScreen() {
  const [hasChanges, setHasChanges] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const [username, setUsername] = useState('JaneDoe');
  // const [usernameError, setUsernameError] = useState('');
  const [name, setName] = useState('');
  // const [nameError, setNameError] = useState('JaneDoe');
  const [studyProgramme, setStudyProgramme] = useState('');
  const [biography, setBiography] = useState('');

  // const [password, setPassword] = useState('');
  // const [passwordError, setPasswordError] = useState('');
  // const [confirmPassword, setPasswordConfirmation] = useState('');
  // const [confirmError, setConfirmError] = useState('');

  // const validateUsername = () => {
  //   const usernameRegex = /^[a-zA-Z0-9]+$/;

  //   if (!usernameRegex.test(username)) {
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

  //   if (!nameRegex.test(name)) {
  //     setNameError('Please enter a name that contains only letters.');
  //     return false;
  //   }
  //   setNameError('');
  //   return true;
  // };

  const handleInputChange = () => {
    setHasChanges(true);
  };
  const onChangeSelectionStudyProgramme = (value) => {
    setStudyProgramme(value);
    setIsPickerOpen(true);
  };

  const handleSaveChanges = (event) => {
    event.preventDefault();
    // const isUsernameValid = validateUsername(username);
    // const isNameValid = validateName(name);
    // const isPasswordValid = validatePassword(password);
    // const isPasswordConfirm = handlePasswordConfirmationChange(confirmPassword);
  };

  const studyProgrammeList = ['BCC', 'BMT', 'SPM', 'ECM'];

  return (
    <PersonalDataView
      emailLabel="cc201028@fhstp.ac.at" // this will be like: user.email
      // Username
      usersnameLabel="JaneDoe207"
      usersnameValue={username} // "JaneDoe207"
      // usernameError={usernameError}
      onChangeTextUsername={(value) => {
        setUsername(value);
        handleInputChange(value);
      }}
      // Name
      nameLabel="Jane Doe"
      nameValue={name} // "JaneDoe"
      // nameError={nameError}
      onChangeTextName={(value) => setName(value)}
      // Biography
      biographyLabel="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
      biographyValue={biography}
      onChangeTextBiography={(value) => setBiography(value)}
      // Study Programme
      studyProgrammeLabel="BCC"
      studyProgrammeList={studyProgrammeList}
      studyProgrammeValue={studyProgramme}
      onChangeSelectionStudyProgramme={onChangeSelectionStudyProgramme}
      isPickerOpen={isPickerOpen}
      // Password
      passwordLabel="*****************"
      // onPasswordConfirmation={(value) => setPasswordConfirmation(value)}
      // confirmError={confirmError}
      onSaveChanges={handleSaveChanges}
      onChangeValuesButton={hasChanges}
    />
  );
}
