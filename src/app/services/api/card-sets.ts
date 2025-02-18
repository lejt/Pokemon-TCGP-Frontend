import { getBackEndHost } from '@/app/constants/constants';
import { isAuthUser } from '@/app/utils/auth';
import { getAuthToken } from '@/app/utils/local-storage';

export const cardSetsApi = {
  getAllCardSetsAndPacks: async () => {
    const isUser = await isAuthUser();
    if (!isUser) return { message: 'Unauthorized' };

    const token = getAuthToken();

    const response = await fetch(`${getBackEndHost()}/card-sets`, {
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
