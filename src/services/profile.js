import axios from "axios";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Get auth token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Create or update profile
export const createProfile = async (payload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Profile`, payload, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json'
      }
    });
    toast.success('Profile created successfully');
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    throw error;
  }
};

// Get profile by userId
export const getProfileByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Profile/user/${userId}`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    throw error;
  }
};

// Update existing profile
export const updateProfile = async (profileId, payload) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/Profile/${profileId}`, payload, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json'
      }
    });
    toast.success('Profile updated successfully');
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    throw error;
  }
};

// Add education
export const addEducation = async (educationData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Education`, educationData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json'
      }
    });
    toast.success('Education added successfully');
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    throw error;
  }
};

// Update education
export const updateEducation = async (educationId, educationData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/Education/${educationId}`, educationData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json'
      }
    });
    toast.success('Education updated successfully');
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    throw error;
  }
};

// Delete education
export const deleteEducation = async (educationId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/Education/${educationId}`, {
      headers: getAuthHeader()
    });
    toast.success('Education deleted successfully');
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    throw error;
  }
};

// Add experience
export const addExperience = async (experienceData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Experience`, experienceData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json'
      }
    });
    toast.success('Experience added successfully');
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    throw error;
  }
};

// Update experience
export const updateExperience = async (experienceId, experienceData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/Experience/${experienceId}`, experienceData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json'
      }
    });
    toast.success('Experience updated successfully');
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    throw error;
  }
};

// Delete experience
export const deleteExperience = async (experienceId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/Experience/${experienceId}`, {
      headers: getAuthHeader()
    });
    toast.success('Experience deleted successfully');
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    throw error;
  }
};

// Add speciality (skill)
export const addSpeciality = async (specialityData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Speciality`, specialityData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json'
      }
    });
    toast.success('Skill added successfully');
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    throw error;
  }
};

// Delete speciality (skill)
export const deleteSpeciality = async (specialityId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/Speciality/${specialityId}`, {
      headers: getAuthHeader()
    });
    toast.success('Skill deleted successfully');
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    throw error;
  }
};

// Add or update overview
export const saveOverview = async (overviewData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Overview`, overviewData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json'
      }
    });
    toast.success('Overview saved successfully');
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    throw error;
  }
};