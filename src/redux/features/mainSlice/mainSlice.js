import { createSlice } from '@reduxjs/toolkit';

// Here we pass the intial state of the variables/object
const initialState = {
  // FIXME: This code needs to be deleted its just an example
  value: 0,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    // FIXME: This action needs to be deleted its just an example
    actionExample: (state) => {
      state.value = state.payload;
    },
  },
});

// Action creators are generated for each case reducer function
// FIXME: This export needs to be deleted its just an example
export const { actionExample } = mainSlice.actions;

export default mainSlice.reducer;
