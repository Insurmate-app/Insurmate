// Wrapper for HTTP requests with Axios
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Add an interceptor for all requests
api.interceptors.request.use((config) => {
  //use context/state management
  const accessToken = localStorage.getItem("token");

  if (accessToken) {
    // Add the access token to the Authorization header
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export default api;
