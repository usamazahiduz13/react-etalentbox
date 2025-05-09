import { createSlice } from '@reduxjs/toolkit';
import { getStoredAuthData } from '../services/auth';

const { token, userId } = getStoredAuthData();

const initialState = {
  isLogin: !!token,
  isAuthenticated: !!token,
  isNewUser: false,
  userInfo: token ? { userId, token } : null,
  loading: false,
  error: null,
  userData: null
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
    },
    updateUserData : (state, action) => {
      if (!state.userData) {
        state.userData = {}; // Initialize userData if it doesn't exist
      }
      
      // Update specific properties in userData
      state.userData = {
        ...state.userData,
        info: action.payload.info || state.userData?.info,
        experience: action.payload.experience || state.userData?.experience,
        education: action.payload.education || state.userData?.education,
        technicalSkill: action.payload.technicalSkill || state.userData?.technicalSkill,
        softSkill: action.payload.softSkill || state.userData?.softSkill,
        portfolio: action.payload.portfolio || state.userData?.portfolio,
        overview: action.payload.overview || state.userData?.overview
      };
    }
  }
});

export const { clearError, toggleAuth, updateUserData } = authSlice.actions;

export default authSlice.reducer; 