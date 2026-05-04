import axios from 'axios';

const api = axios.create({
  baseURL: 'https://qf5k9fspl0.execute-api.us-east-1.amazonaws.com/default',
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer fake-jwt-token`;
  return config;
});

export default api