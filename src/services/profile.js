import axios from "axios";
import { toast } from "sonner";
import { store } from '../Redux/store';

const API_BASE_URL = 'http://api.etalentbox.com/api';

// Get auth token from Redux store
const getAuthHeader = () => {
  const token = store.getState().auth.token;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Create or update profile
export const createProfile = async (payload) => {
  try {
    // Get userId from Redux store instead of payload
    const userId = store.getState().auth.userId;
    
    if (!userId) {
      throw new Error('User not authenticated');
    }
    
    // Ensure userId is included in the payload
    const profileData = {
      ...payload,
      userId
    };
    
    // Create FormData for file upload
    const formData = new FormData();
    
    // Add all profile data to FormData
    Object.keys(profileData).forEach(key => {
      if (key === 'artifactUrl' && typeof profileData[key] === 'string' && profileData[key].startsWith('data:')) {
        // Convert base64 to blob for image upload
        const base64Data = profileData[key].split(',')[1];
        const byteCharacters = atob(base64Data);
        const byteArrays = [];
        
        for (let i = 0; i < byteCharacters.length; i++) {
          byteArrays.push(byteCharacters.charCodeAt(i));
        }
        
        const blob = new Blob([new Uint8Array(byteArrays)], { type: 'image/jpeg' });
        formData.append('artifactUrl', blob, 'profile-image.jpg');
      } else {
        formData.append(key, profileData[key]);
      }
    });

    const response = await axios.post(`${API_BASE_URL}/Profile`, profileData, {
      headers: {
        ...getAuthHeader(),
        'accept': 'application/json',
        'Content-Type': 'application/json-patch+json'
      }
    });

    toast.success('Profile created successfully');
    return response.data;
  } catch (error) {
    console.error('Profile creation error:', error);
    toast.error(error.response?.data?.message || 'Failed to create profile');
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