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

  getPackPreviewCards: async (cardSetId: number, packId: number) => {
    const isUser = await isAuthUser();
    if (!isUser) return { message: 'Unauthorized' };

    const token = getAuthToken();

    const response = await fetch(
      `${getBackEndHost()}/cards/pack-preview?cardSetId=${cardSetId}&packId=${packId}`,
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
          data.message ||
          'Failed to get cards from pack preview. Try again later',
      };
    }
    return data;
  },

  openPack: async (cardSetId: number, packId: number | null) => {
    const isUser = await isAuthUser();
    if (!isUser) return { message: 'Unauthorized' };

    const token = getAuthToken();

    const response = await fetch(`${getBackEndHost()}/cards/generate-pack`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ cardSetId, packId }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        message: data.message || 'Failed to open a pack. Try again later',
      };
    }
    return data;
  },
};
