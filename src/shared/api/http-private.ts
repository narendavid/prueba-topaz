import { useAuthStore } from '@/src/features/auth/store/useAuthStore';
import axios from 'axios';

const api = axios.create();

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { api };

