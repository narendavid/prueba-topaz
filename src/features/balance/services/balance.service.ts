import { api } from '@/src/shared/api/http-private';

export const getBalanceService = async () => {
  const response = await api.get('https://2k0ic4z7s5.execute-api.us-east-1.amazonaws.com/default/balance');
  return response.data;
};