import { configureStore } from '@reduxjs/toolkit';
import mainReducer from '../features/mainSlice/mainSlice';

export default configureStore({
  reducer: {
    main: mainReducer,
  },
});
