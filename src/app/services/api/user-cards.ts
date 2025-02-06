import { getBackEndHost } from '@/app/constants/constants';
import { isAuthUser } from '@/app/utils/auth';
import { getAuthToken } from '@/app/utils/local-storage';

export const userCardsApi = {
  getUserCards: async () => {
    const isUser = await isAuthUser();
    if (!isUser) return;
    console.log('user valid');
    const token = getAuthToken();

    const response = await fetch(`${getBackEndHost()}/users/me/cards`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      // must return error as message instead of throw (error message from backend)
      return {
        message:
          data.message || 'Failed to load cards from user. Try again later',
      };
    }
    console.log(data);
    return data;
  },
};
