import { STORAGE } from '../constants/constants';

export const getAuthToken = (): string | null => {
  return window.localStorage.getItem(STORAGE.ACCESS_TOKEN);
};

export const setAuthToken = (token: string): void => {
  window.localStorage.setItem(STORAGE.ACCESS_TOKEN, token);
};

export const removeAuthToken = (): void => {
  window.localStorage.removeItem(STORAGE.ACCESS_TOKEN);
};
