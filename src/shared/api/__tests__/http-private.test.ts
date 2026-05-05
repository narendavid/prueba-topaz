import MockAdapter from 'axios-mock-adapter';

import { useAuthStore } from '@/src/features/auth/store/useAuthStore';
import * as authStorage from '@/src/features/auth/utils/authStorage';
import { api } from '../http-private';

jest.mock('@/src/features/auth/utils/authStorage', () => ({
  getToken: jest.fn(),
}));

describe('http-private (axios instance)', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(api);

    jest.clearAllMocks();

    useAuthStore.setState({
      user: null,
      token: null,
      isInitialized: true,
      logout: jest.fn(),
    });
  });

  afterEach(() => {
    mock.restore();
  });

  it('should attach token from store to request headers', async () => {
    useAuthStore.setState({ token: 'store-token' });

    mock.onGet('/test').reply((config) => {
      expect(config.headers?.Authorization).toBe('Bearer store-token');
      return [200, {}];
    });

    await api.get('/test');
  });

  it('should fetch token from storage if not in store', async () => {
    (authStorage.getToken as jest.Mock).mockResolvedValue('storage-token');

    mock.onGet('/test').reply((config) => {
      expect(config.headers?.Authorization).toBe('Bearer storage-token');
      return [200, {}];
    });

    await api.get('/test');

    expect(authStorage.getToken).toHaveBeenCalled();
  });

  it('should not attach Authorization header if no token', async () => {
    (authStorage.getToken as jest.Mock).mockResolvedValue(null);

    mock.onGet('/test').reply((config) => {
      expect(config.headers?.Authorization).toBeUndefined();
      return [200, {}];
    });

    await api.get('/test');
  });

  it('should call logout on 401 response', async () => {
    const logoutMock = jest.fn();

    useAuthStore.setState({ logout: logoutMock });

    mock.onGet('/test').reply(401);

    await expect(api.get('/test')).rejects.toBeTruthy();

    expect(logoutMock).toHaveBeenCalled();
  });

  it('should call logout on 403 response', async () => {
    const logoutMock = jest.fn();

    useAuthStore.setState({ logout: logoutMock });

    mock.onGet('/test').reply(403);

    await expect(api.get('/test')).rejects.toBeTruthy();

    expect(logoutMock).toHaveBeenCalled();
  });
});