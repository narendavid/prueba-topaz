import { useAuthStore } from '@/src/features/auth/store/useAuthStore';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://2k0ic4z7s5.execute-api.us-east-1.amazonaws.com/default/',
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { api };

