import { useAuthStore } from '@/src/features/auth/store/useAuthStore';
import { getToken } from '@/src/features/auth/utils/authStorage';
import axios from 'axios';

const api = axios.create();

api.interceptors.request.use(
  async (config) => {
    let token = useAuthStore.getState().token;
    
    if (!token) {
      token = await getToken();
    }

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      const logout = useAuthStore.getState().logout;
      await logout();
    }

    return Promise.reject(error);
  }
);

export { api };

