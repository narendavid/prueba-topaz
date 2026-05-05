import { create } from 'zustand';
import { getToken, removeToken, setToken } from '../utils/authStorage';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isInitialized: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isInitialized: false,

  setAuth: async (user, token) => {
    await setToken(token);
    set({ user, token });
  },

  logout: async () => {
    await removeToken();
    set({ user: null, token: null });
  },

  initializeAuth: async () => {
    try {
      const savedToken = await getToken();
      if (savedToken) {
        set({ token: savedToken, isInitialized: true });
      } else {
        set({ isInitialized: true });
      }
    } catch (error) {
      console.error('Error al inicializar autenticación:', error);
      set({ isInitialized: true });
    }
  },
}));