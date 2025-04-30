// api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL; 

// Login function
export const login = async (payload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Account/Logon`, payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Register function
export const register = async (payload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Account/CandidateRegister`, payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Reset password via email
export const resetPasswordEmail = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Account/ForgotPassword`, { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
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