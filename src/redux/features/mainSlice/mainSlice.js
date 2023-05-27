import { createSlice } from '@reduxjs/toolkit';

// Here we pass the intial state of the variables/object
const initialState = {
  // FIXME: This code needs to be deleted its just an example
  selectedMainGroup: 'Feed',
  selectedSubGroup: '',
  currentUser: {},
  IpAddress: '10.5.13.150',
  selectedNewJoinedGroups: [],
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setSelectedMainGroup: (state, action) => {
      state.selectedMainGroup = action.payload;
    },
    SetselectedSubGroup: (state, action) => {
      state.selectedSubGroup = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setNewJoinedGroup: (state, action) => {
      state.selectedNewJoinedGroups = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSelectedMainGroup,
  SetselectedSubGroup,
  setCurrentUser,
  setNewJoinedGroup,
} = mainSlice.actions;

export const selectedGroup = (state) => state.main.selectedMainGroup;
export const selectedSupGroup = (state) => state.main.selectedSubGroup;
export const selectedUser = (state) => state.main.currentUser;
export const IpAddress = (state) => state.main.IpAddress;
export const selectedNewJoinedGroups = (state) =>
  state.main.selectedNewJoinedGroups;

export default mainSlice.reducer;
