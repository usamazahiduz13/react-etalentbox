import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'sonner';
import fetchApi from '../utils/axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://api.etalentbox.com/api';

// Async thunks for profile operations
export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (userId, { rejectWithValue }) => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");
      
      const response = await axios.get(`${API_BASE_URL}/Profile/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch profile');
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createUserProfile = createAsyncThunk(
  'user/createProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      console.log('Sending profile data to API:', JSON.stringify(profileData));
      
      
      
      const response = await fetchApi.post(`/Profile`, profileData);
      console.log('API response:', response.data);
      toast.success('Profile created successfully');
      return response.data;
    } catch (error) {
      console.error('API error details:', error.response?.data);
      toast.error(error.response?.data?.message || 'Failed to create profile');
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");
      
      const response = await axios.put(`${API_BASE_URL}/Profile/${profileData.id}`, profileData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      toast.success('Profile updated successfully');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Initial state matching the schema
const initialState = {
  profile: {
    id: null,
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    nationality: '',
    language: '',
    workCountry: '',
    cnic: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    phoneNumber: '',
    race: '',
    gender: '',
    veteran: '',
    lastFourDigitOfSsn: '',
    passportNumber: '',
    workAuthoriztion: '',
    willingToRelocate: false,
    willingToTravel: false,
    idNumber: '',
    profileLevel: '',
    availableOn: null,
    isAvailable: false,
    userId: null,
    artifactUrl: '',
    isUpdate: false,
    isPortfolioPrivate: false,
    status: '',
    user: null
  },
  experiences: [],
  education: [],
  specialities: [],
  technicalSkills: [],
  softSkills: [],
  availabilities: [],
  overview:null,
  loading: false,
  error: null,
  success: false,
  currentStep: 0
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Generic profile data update
    updateProfileData: (state, action) => {
      state.profile = {
        ...state.profile,
        ...action.payload
      };
    },
    
    // Experience section
    addExperience: (state, action) => {
      state.experiences.push(action.payload);
    },
    updateExperience: (state, action) => {
      const { index, data } = action.payload;
      state.experiences[index] = data;
    },
    removeExperience: (state, action) => {
      state.experiences = state.experiences.filter((_, index) => index !== action.payload);
    },
    
    // Education section
    addEducation: (state, action) => {
      state.education.push(action.payload);
    },
    updateEducation: (state, action) => {
      const { index, data } = action.payload;
      state.education[index] = data;
    },
    removeEducation: (state, action) => {
      state.education = state.education.filter((_, index) => index !== action.payload);
    },
    
    // Set education data from API
    setEducation: (state, action) => {
      state.education = action.payload;
    },
    
    // Skills section
    addSpeciality: (state, action) => {
      state.specialities.push(action.payload);
    },
    removeSpeciality: (state, action) => {
      state.specialities = state.specialities.filter(skill => skill.id !== action.payload);
    },
    
    // Technical Skills
    setTechnicalSkills: (state, action) => {
      state.technicalSkills = action.payload;
    },
    addTechnicalSkill: (state, action) => {
      state.technicalSkills.push(action.payload);
    },
    removeTechnicalSkill: (state, action) => {
      state.technicalSkills = state.technicalSkills.filter(skill => skill.id !== action.payload);
    },
    
    // Soft Skills
    setSoftSkills: (state, action) => {
      state.softSkills = action.payload;
    },
    addSoftSkill: (state, action) => {
      state.softSkills.push(action.payload);
    },
    removeSoftSkill: (state, action) => {
      state.softSkills = state.softSkills.filter(skill => skill.id !== action.payload);
    },
    
    // Update overview
    updateOverview: (state, action) => {
      state.overview.overviewDetail = action.payload;
    },
    
    // Navigation
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    prevStep: (state) => {
      if (state.currentStep > 0) {
        state.currentStep -= 1;
      }
    },
    
    // Reset profile form
    resetProfile: (state) => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    // Fetch profile cases
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.experiences = action.payload.experiences || [];
        state.education = action.payload.education || [];
        state.specialities = action.payload.specialities || [];
        state.availabilities = action.payload.availabilities || [];
        state.overview = action.payload.overview || { overviewDetail: '', userId: action.payload.userId };
        state.success = true;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create profile cases
      .addCase(createUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.success = true;
      })
      .addCase(createUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update profile cases
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.success = true;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  updateProfileData,
  addExperience,
  updateExperience,
  removeExperience,
  addEducation,
  updateEducation,
  removeEducation,
  setEducation,
  addSpeciality,
  removeSpeciality,
  setTechnicalSkills,
  addTechnicalSkill,
  removeTechnicalSkill,
  setSoftSkills,
  addSoftSkill,
  removeSoftSkill,
  updateOverview,
  setCurrentStep,
  nextStep,
  prevStep,
  resetProfile
} = userSlice.actions;

export default userSlice.reducer;
