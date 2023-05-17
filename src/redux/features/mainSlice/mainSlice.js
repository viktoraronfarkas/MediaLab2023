import { createSlice } from '@reduxjs/toolkit';

// Here we pass the intial state of the variables/object
const initialState = {
  // FIXME: This code needs to be deleted its just an example
  value: 'Feed',
  currentUser: {},
  IpAddress: '10.55.103.60',
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    actionExample: (state, action) => {
      state.value = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { actionExample, setCurrentUser } = mainSlice.actions;

export const selectedGroup = (state) => state.main.value;
export const selectedUser = (state) => state.main.currentUser;
export const IpAddress = (state) => state.main.IpAddress;

export default mainSlice.reducer;
