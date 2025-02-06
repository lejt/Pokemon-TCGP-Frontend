import { jwtDecode } from 'jwt-decode';
import { getAuthToken } from './local-storage';
import { authApi } from '../services/api/auth';

export const isValidToken = (token: string): boolean => {
  if (!token) return false;
  try {
    const decodedToken = jwtDecode(token);
    if (!decodedToken.exp) {
      return true;
    }
    const currentTime = Date.now() / 1000;
    return decodedToken.exp >= currentTime;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return false;
  }
};

export const isAuthUser = async (): Promise<boolean> => {
  const token = getAuthToken();
  if (!token) return false;
  if (!isValidToken(token)) return false;
  const { valid } = await authApi.validateToken(token);
  return valid;
};
