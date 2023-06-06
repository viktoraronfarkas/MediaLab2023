import { createSlice } from '@reduxjs/toolkit';

// Here we pass the initial state of the variables/object
const initialState = {
  // TODO FIXME: This code needs to be deleted its just an example
  selectedMainGroup: 'Feed',
  selectedSubGroup: '',
  currentUser: {},
  currentUserId: '',
  IpAddress: '192.168.1.103',
  loggedIn: '',
  selectedNewJoinedGroups: [],
  posts: [],
  mainGroups: {},
  preventBack: false,
  feed: [],
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setSelectedMainGroup: (state, action) => {
      state.selectedMainGroup = action.payload;
    },
    SetSelectedSubGroup: (state, action) => {
      state.selectedSubGroup = action.payload;
    },
    setCurrentUser: (state, action) => {
      const updatedProps = action.payload;
      state.currentUser = { ...state.currentUser, ...updatedProps };
    },
    setCurrentUserId: (state, action) => {
      state.currentUserId = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    setNewJoinedGroup: (state, action) => {
      state.selectedNewJoinedGroups = action.payload;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setMainGroups: (state, action) => {
      state.mainGroups = action.payload;
    },
    setPreventBack: (state, action) => {
      state.preventBack = action.payload;
    },
    setFeed: (state, action) => {
      state.feed = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSelectedMainGroup,
  SetSelectedSubGroup,
  setCurrentUser,
  setLoggedIn,
  setNewJoinedGroup,
  setPosts,
  setCurrentUserId,
  setMianGroups,
  setPreventBack,
  setMainGroups,
  setFeed,
} = mainSlice.actions;

export const selectedGroup = (state) => state.main.selectedMainGroup;
export const selectedSubGroup = (state) => state.main.selectedSubGroup;
export const selectedUser = (state) => state.main.currentUser;
export const selectedUserId = (state) => state.main.currentUserId;
export const IpAddress = (state) => state.main.IpAddress;
export const loggedIn = (state) => state.main.loggedIn;
export const selectedNewJoinedGroups = (state) =>
  state.main.selectedNewJoinedGroups;
export const posts = (state) => state.main.posts;
export const mainGroups = (state) => state.main.mainGroups;
export const preventBack = (state) => state.main.preventBack;
export const feed = (state) => state.main.feed;

export default mainSlice.reducer;
