import axios from "axios";
import { store } from "../Redux/store";

// Create axios instance with base URL
export const fetchApi = axios.create({
  baseURL: 'http://api.etalentbox.com/api', 
  headers: { "Content-Type": "application/json" },
});

// Add request interceptor for authentication
fetchApi.interceptors.request.use(
  (config) => {
    // Get token from Redux store
    const token = store.getState().auth.token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
fetchApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      // Dispatch logout action if needed
      // store.dispatch(logout());
      // Redirect to login page
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

// Export default for convenience
export default fetchApi;


