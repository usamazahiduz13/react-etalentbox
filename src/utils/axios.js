import axios from "axios";

// Create axios instance with base URL
export const fetchApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  headers: { "Content-Type": "application/json" },
});

// Add request interceptor for authentication if needed
fetchApi.interceptors.request.use(
  (config) => {
    // Get token from localStorage if you have authentication
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Export default for convenience
export default fetchApi;


