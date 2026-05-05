import * as authStorage from '../../utils/authStorage';
import { useAuthStore } from '../useAuthStore';

jest.mock('../../utils/authStorage', () => ({
  getToken: jest.fn(),
  setToken: jest.fn(),
  removeToken: jest.fn(),
}));

describe('useAuthStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAuthStore.setState({
      user: null,
      token: null,
      isInitialized: false,
    });
  });

  describe('setAuth', () => {
    it('should save token and update auth state', async () => {
      const user = {
        id: 1,
        name: 'Naren',
        email: 'naren@test.com',
      };

      await useAuthStore.getState().setAuth(user, 'fake-token');

      expect(authStorage.setToken).toHaveBeenCalledWith('fake-token');

      expect(useAuthStore.getState().user).toEqual(user);
      expect(useAuthStore.getState().token).toBe('fake-token');
    });
  });

  describe('logout', () => {
    it('should remove token and clear auth state', async () => {
      useAuthStore.setState({
        user: {
          id: 1,
          name: 'Naren',
          email: 'naren@test.com',
        },
        token: 'fake-token',
        isInitialized: true,
      });

      await useAuthStore.getState().logout();

      expect(authStorage.removeToken).toHaveBeenCalled();

      expect(useAuthStore.getState().user).toBeNull();
      expect(useAuthStore.getState().token).toBeNull();
    });
  });

  describe('initializeAuth', () => {
    it('should restore token from storage', async () => {
      (authStorage.getToken as jest.Mock).mockResolvedValue('saved-token');

      await useAuthStore.getState().initializeAuth();

      expect(authStorage.getToken).toHaveBeenCalled();
      expect(useAuthStore.getState().token).toBe('saved-token');
      expect(useAuthStore.getState().isInitialized).toBe(true);
    });

    it('should initialize without token if storage is empty', async () => {
      (authStorage.getToken as jest.Mock).mockResolvedValue(null);

      await useAuthStore.getState().initializeAuth();

      expect(useAuthStore.getState().token).toBeNull();
      expect(useAuthStore.getState().isInitialized).toBe(true);
    });

    it('should handle storage errors gracefully', async () => {
      (authStorage.getToken as jest.Mock).mockRejectedValue(
        new Error('storage error')
      );

      await useAuthStore.getState().initializeAuth();

      expect(useAuthStore.getState().isInitialized).toBe(true);
    });
  });
});