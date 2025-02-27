import { getAuthToken } from './local-storage';
import { authApi } from '../services/api/auth';

export const isAuthUser = async (): Promise<boolean> => {
  const token = getAuthToken();
  if (!token) return false;

  const { valid } = await authApi.validateToken(token);
  return valid;
};
