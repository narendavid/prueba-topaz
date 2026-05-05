import { api } from '@/src/shared/api/http-private';
import { APITransaction } from '../types/transfer';

interface TransferPayload {
  value: number;
  currency: string;
  payeerDocument: string;
  transferDate: string;
}

export const transferService = async (payload: TransferPayload) => {
  const response = await api.post('https://ofqx4zxgcf.execute-api.us-east-1.amazonaws.com/default/transfer', payload);
  return response.data;
};



export const getTransfers = async () => {
  const response = await api.get<APITransaction>('https://n0qaa2fx3c.execute-api.us-east-1.amazonaws.com/default/transferList');
  return response.data;
};