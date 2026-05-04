import { api } from "@/src/shared/api/http";

interface LoginPayload {
  email: string;
  password: string;
}

export const loginService = async (payload: LoginPayload) => {
  const response = await api.post('/login', payload);
  return response.data;
};