// api.js
import axios from 'axios';

const API_BASE_URL = 'http://api.etalentbox.com/api';

// Login function - kept for backward compatibility, but prefer using the auth slice login thunk
export const login = async (payload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Account/Logon`, payload);
    const { baseModel, user } = response.data || {};
    
    // The format returned by the API - reformat for auth slice
    return {
      userId: user,
      token: baseModel?.data,
      isNewUser: !!response.data.isNewUser
    };
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

// Register function
export const register = async (payload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Account/Register`, payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

// Reset password email
export const resetPasswordEmail = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Account/ForgotPassword`, { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

// Reset password with token
export const resetPassword = async (payload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Account/ResetPassword`, payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

// Get user profile
export const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Account/Profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

// Change user password
export const changeUserPassword = async (values) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/auth/pasword`, values);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};