import axios from "axios";

import { getToken } from "../hooks/tokenManager";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const useApi = () => {
  const token = getToken();
  api.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return api;
};
