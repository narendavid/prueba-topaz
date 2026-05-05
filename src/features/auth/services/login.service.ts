import { api } from "@/src/shared/api/http";
import { useAuthStore } from "../store/useAuthStore";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export const loginService = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/login', payload);
  
  // Guardar token y usuario en el store
  if (response.data.token && response.data.user) {
    const { setAuth } = useAuthStore.getState();
    await setAuth(response.data.user, response.data.token);
  }
  
  return response.data;
};