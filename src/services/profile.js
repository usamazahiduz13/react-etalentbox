import axios from "axios";
import { toast } from "sonner";
import { store } from '../Redux/store';
import fetchApi from "../utils/axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://api.etalentbox.com/api';


// Get auth token from Redux store
const getAuthHeader = () => {
  const token = store.getState().auth.token;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Create or update profile
export const createProfile = async (payload) => {
  try {
    const userId = store.getState().auth.userId;
    
    if (!userId) {
      throw new Error('User not authenticated');
    }
    
    const profileData = {
      ...payload,
      userId
    };
    
    const response = await axios.post(`${API_BASE_URL}/Profile`, profileData, {
      headers: {
        ...getAuthHeader(),
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
export const getProfileByUserId = async () => {
  try {
    const userId = store.getState().auth.userId;
    
    if (!userId) {
      throw new Error('User not authenticated');
    }
    
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
    const response = await fetchApi.post(`/Education`, [educationData]);
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
    const response = await fetchApi.put(`/Education`, educationData, {
      headers: {
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
export const deleteEducation = async (education) => {
  try {
    const response = await fetchApi.delete(`/Education`, {
      headers: {
        'Content-Type': 'application/json-patch+json'
      },
      data: education
    });
    if(response.data.success){
      toast.success('Education deleted successfully');
      return response.data;
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    throw error;
  }
};

// Add experience
export const addExperience = async (experienceData) => {
  try {
    const response = await fetchApi.post(`/Experience`, [experienceData]);
   
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    throw error;
  }
};

// Update experience
export const updateExperience = async (experienceId, experienceData) => {
  try {
    const response = await axios.put(`/Experience`, experienceData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json-patch+json'
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
export const deleteExperience = async (experience) => {
  try {
    const response = await fetchApi.delete(`/Experience`, {
      headers: {
        'Content-Type': 'application/json-patch+json'
      },
      data: experience
    });
    if(response.data.success){
      toast.success('Experience deleted successfully');
      return response.data;
    }
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