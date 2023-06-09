import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import mainReducer from '../features/mainSlice/mainSlice';

const middleware = [
  ...getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  }),
  thunkMiddleware,
];

export default configureStore({
  reducer: {
    main: mainReducer,
  },
  middleware,
});
