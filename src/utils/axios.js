import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://api.etalentbox.com/api';

// Create axios instance
const fetchApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
});


export default fetchApi;


