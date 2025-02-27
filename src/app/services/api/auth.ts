import { getBackEndHost } from '../../constants/constants';

export const authApi = {
  signIn: async (username: string, password: string) => {
    const response = await fetch(`${getBackEndHost()}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      // must return error as message instead of throw (error message from backend)
      return { message: data.message || 'Login attempt failed. Try again.' };
    }

    return { accessToken: data.accessToken };
  },

  signUp: async (username: string, password: string) => {
    const response = await fetch(`${getBackEndHost()}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    // TODO: abstract repeating code to keep DRY
    const data = await response.json();

    if (!response.ok) {
      return { message: data.message || 'Sign up failed. Try again.' };
    }
    return data;
  },

  validateToken: async (accessToken: string) => {
    const response = await fetch(`${getBackEndHost()}/auth/validate-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accessToken }),
    });

    return response.json();
  },
};
