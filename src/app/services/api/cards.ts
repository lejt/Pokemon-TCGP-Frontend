import { getHost } from '@/app/constants/constants';
import { getAuthToken } from '@/app/utils/local-storage';

export const cardsApi = {
  getAllCards: async (paginationProp: { page: number; limit: number }) => {
    const { page, limit } = paginationProp;

    const token = getAuthToken();
    if (!token) return false;

    const response = await fetch(
      `${getHost()}/cards?page=${page}&limit=${limit}`,
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
    const token = getAuthToken();
    if (!token) return false;

    const response = await fetch(`${getHost()}/cards/rarity-count`, {
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
    const token = getAuthToken();
    if (!token) return false;

    const response = await fetch(
      `${getHost()}/cards/pack-preview?cardSetId=${cardSetId}&packId=${packId}`,
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
    const token = getAuthToken();
    if (!token) return false;

    const response = await fetch(`${getHost()}/cards/generate-pack`, {
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
