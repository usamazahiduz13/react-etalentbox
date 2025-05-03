import { createSlice } from '@reduxjs/toolkit';
import { getStoredAuthData } from '../services/auth';

const { token, userId } = getStoredAuthData();

const initialState = {
  isLogin: !!token,
  isAuthenticated: !!token,
  isNewUser: false,
  userInfo: token ? { userId, token } : null,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    toggleAuth: (state, action) => {
      const { isLogin, userInfo } = action.payload;
      state.isLogin = isLogin;
      state.isAuthenticated = isLogin;
      state.userInfo = userInfo;
    }
  }
});

export const { clearError, toggleAuth } = authSlice.actions;

export default authSlice.reducer; 