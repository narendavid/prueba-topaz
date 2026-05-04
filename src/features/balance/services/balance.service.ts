import { api } from '@/src/shared/api/http-private';

export const getBalanceService = async () => {
  const response = await api.get('/balance');
  return response.data;
};