import { useRouter } from 'expo-router';
import { useAuthStore } from '../store/useAuthStore';

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  };

  return { logout: handleLogout };
};
