import { getHost } from '../../constants/constants';
import { makePostRequest } from '@/app/utils/makeRequest';

export const authApi = {
  signIn: async (username: string, password: string) => {
    const url = `${getHost()}/auth/signin`;
    return makePostRequest(
      url,
      { username, password },
      'Login attempt failed. Try again.'
    );
  },
  signUp: async (username: string, password: string) => {
    const url = `${getHost()}/auth/signup`;
    return makePostRequest(
      url,
      { username, password },
      'Sign up failed. Try again.'
    );
  },

  validateToken: async (accessToken: string) => {
    const url = `${getHost()}/auth/validate-token`;
    return makePostRequest(
      url,
      { accessToken },
      'Token validation failed. Try again.'
    );
  },
};
