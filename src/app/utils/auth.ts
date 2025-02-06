import { jwtDecode } from 'jwt-decode';
import { getBackEndHost } from '../constants/constants';
import { getAuthToken, setAuthToken } from './local-storage';

interface FormState {
  accessToken?: string;
  message?: string;
}

export const signinUser = async (
  prevState: FormState,
  formData: FormData
): Promise<{ accessToken?: string; message?: string }> => {
  const username = formData.get('username');
  const password = formData.get('password');

  const response = await fetch(`${getBackEndHost()}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    return { message: data.message || 'Login attempt failed. Try again.' };
  }

  // TODO: consider storing in session storage to expose to only current tab or session
  setAuthToken(data.accessToken);

  return { accessToken: data.accessToken };
};

export const isExpiredToken = (): boolean => {
  const token = getAuthToken();
  if (!token) return true;
  try {
    const decodedToken = jwtDecode(token);
    if (!decodedToken.exp) {
      return false;
    }

    const currentTime = Date.now() / 1000;
    return decodedToken.exp <= currentTime;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return true;
  }
};

export const isAuthUser = async (): Promise<boolean> => {
  const accessToken = getAuthToken();
  if (!accessToken) return false;

  try {
    const response = await fetch(`${getBackEndHost()}/auth/validate-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accessToken }),
    });

    const data = await response.json();
    return data.valid;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return false;
  }
};
