import { getHost } from '@/app/constants/constants';
import { getAuthToken } from '@/app/utils/local-storage';

export const cardSetsApi = {
  getAllCardSetsAndPacks: async () => {
    const token = getAuthToken();
    if (!token) return false;

    const response = await fetch(`${getHost()}/card-sets`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        message:
          data.message || 'Failed to load card sets database. Try again later',
      };
    }
    return data;
  },
};
