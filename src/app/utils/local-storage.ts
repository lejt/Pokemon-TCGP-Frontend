import { STORAGE } from '../constants/constants';

const isBrowser = typeof window !== 'undefined';

export const getAuthToken = (): string | null | undefined => {
  if (isBrowser) {
    return window.localStorage.getItem(STORAGE.ACCESS_TOKEN);
  }
};

export const setAuthToken = (token: string): void => {
  if (isBrowser) {
    window.localStorage.setItem(STORAGE.ACCESS_TOKEN, token);
  }
};

export const removeAuthToken = (): void => {
  if (isBrowser) {
    window.localStorage.removeItem(STORAGE.ACCESS_TOKEN);
  }
};
