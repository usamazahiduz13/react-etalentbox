// api.js
import axios from "axios";
import fetchApi from "../utils/axios";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://api.etalentbox.com/api';

// Login function
export const login = async (payload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Account/Logon`, payload);
   return response
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to login');
  }
};

// Get stored auth data
export const getStoredAuthData = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  return { token, userId };
};

// Clear stored auth data
export const clearStoredAuthData = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
};

// Register function
export const register = async (payload) => {
  try {
    const response = await fetchApi.post(
      `/Account/CandidateRegister`,
      payload
    );
    return response;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to register');
  }
};

// Reset password email
export const resetPasswordEmail = async (email) => {
  try {
    const response = await fetchApi.post(
      `/Account/ForgotPassword`,
      { email }
    );
    return response;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to reset password');
  }
};

// Reset password with token
export const resetPassword = async (payload) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/Account/ResetPassword`,
      payload
    );
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
        Authorization: `Bearer ${token}`,
      },
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
