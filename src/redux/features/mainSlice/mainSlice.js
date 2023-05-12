import { createSlice } from '@reduxjs/toolkit';

// Here we pass the intial state of the variables/object
const initialState = {
  // FIXME: This code needs to be deleted its just an example
  value: 'Feed',
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    actionExample: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { actionExample } = mainSlice.actions;

export const selectedGroup = (state) => state.main.value;

export default mainSlice.reducer;
