import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user-slice';
import authReducer from './auth-slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store; 