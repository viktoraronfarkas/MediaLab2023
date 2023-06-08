import { configureStore } from '@reduxjs/toolkit';
import mainReducer from '../features/mainSlice/mainSlice';

const store = configureStore({
  reducer: {
    main: mainReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable state check
    }),
});

export default store;
