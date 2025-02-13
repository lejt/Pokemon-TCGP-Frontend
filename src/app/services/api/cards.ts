import { getBackEndHost } from '@/app/constants/constants';
import { isAuthUser } from '@/app/utils/auth';
import { getAuthToken } from '@/app/utils/local-storage';

export const cardsApi = {
  getAllCards: async (paginationProp: { page: number; limit: number }) => {
    const { page, limit } = paginationProp;

    const isUser = await isAuthUser();
    if (!isUser) return { message: 'Unauthorized' };

    const token = getAuthToken();

    const response = await fetch(
      `${getBackEndHost()}/cards?page=${page}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        message:
          data.message || 'Failed to load card database. Try again later',
      };
    }
    return data;
  },

  getRarityCountBasedOnCardSets: async () => {
    const isUser = await isAuthUser();
    if (!isUser) return { message: 'Unauthorized' };

    const token = getAuthToken();

    const response = await fetch(`${getBackEndHost()}/cards/rarity-count`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        message: data.message || 'Failed to get rarity counts. Try again later',
      };
    }
    return data;
  },

  // TODO: add generate pack api here
};
