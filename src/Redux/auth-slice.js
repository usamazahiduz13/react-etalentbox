import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'sonner';

const API_BASE_URL = 'http://api.etalentbox.com/api';

// Initialize state from localStorage if available
const initialState = {
  userId: localStorage.getItem('userId') || null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  isNewUser: localStorage.getItem('isNewUser') === 'true' || false,
  loading: false,
  error: null
};

// Login thunk
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/Account/Logon`, credentials);
      const { baseModel, user, isNewUser = false } = response.data || {};
      
      const token = baseModel?.data;
      const userId = user;
      
      // Store in localStorage
      localStorage.setItem('userId', userId);
      localStorage.setItem('token', token);
      localStorage.setItem('isNewUser', isNewUser);
      
      return { userId, token, isNewUser };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      return rejectWithValue(error.response?.data || 'Login failed');
    }
  }
);

// Register thunk
export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/Account/Register`, userData);
      toast.success('Registration successful! Please login.');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      return rejectWithValue(error.response?.data || 'Registration failed');
    }
  }
);

// Logout thunk
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // Clear localStorage
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      localStorage.removeItem('isNewUser');
      
      return true;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCredentials: (state, action) => {
      const { userId, token, isNewUser } = action.payload;
      state.userId = userId;
      state.token = token;
      state.isAuthenticated = !!token;
      state.isNewUser = isNewUser;
      
      // Update localStorage
      localStorage.setItem('userId', userId);
      localStorage.setItem('token', token);
      localStorage.setItem('isNewUser', isNewUser);
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userId = action.payload.userId;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isNewUser = action.payload.isNewUser;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.userId = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isNewUser = false;
      });
  }
});

export const { clearError, setCredentials } = authSlice.actions;

export default authSlice.reducer; 