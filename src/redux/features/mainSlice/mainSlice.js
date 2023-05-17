import { createSlice } from '@reduxjs/toolkit';

// Here we pass the intial state of the variables/object
const initialState = {
  // FIXME: This code needs to be deleted its just an example
  selectedMainGroup: 'Feed',
  selectedSubGroup: '',
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
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedMainGroup, SetselectedSubGroup } = mainSlice.actions;

export const selectedGroup = (state) => state.main.selectedMainGroup;
export const selectedSupGroup = (state) => state.main.selectedSubGroup;

export default mainSlice.reducer;
