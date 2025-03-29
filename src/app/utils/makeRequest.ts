import { getAuthToken } from './local-storage';

// Helper function to make requests with or without authentication
const makeRequest = async (
  url: string,
  method: 'GET' | 'POST',
  body: object | null,
  errorMessage: string,
  isProtected: boolean = false
) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (isProtected) {
    const token = getAuthToken();
    if (!token) return { message: 'Unauthorized access. Please log in.' };
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options: RequestInit = {
    method,
    headers,
    body: method === 'POST' ? JSON.stringify(body) : null,
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      return { message: data.message || errorMessage }; // must return error as message instead of throw (error message from backend)
    }

    return data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { message: 'Network error. Please try again later.' };
  }
};

export const makePostRequest = (
  url: string,
  body: object,
  errorMessage: string
) => {
  return makeRequest(url, 'POST', body, errorMessage);
};

export const makeGetRequest = (url: string, errorMessage: string) => {
  return makeRequest(url, 'GET', null, errorMessage);
};

export const makeProtectedPostRequest = (
  url: string,
  body: object,
  errorMessage: string
) => {
  return makeRequest(url, 'POST', body, errorMessage, true);
};

export const makeProtectedGetRequest = (url: string, errorMessage: string) => {
  return makeRequest(url, 'GET', null, errorMessage, true);
};
