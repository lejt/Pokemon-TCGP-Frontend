import { getBackEndHost } from '@/app/constants/constants';
import { getAuthToken } from '@/app/utils/local-storage';

interface SortByProp {
  field?: string;
  order?: string;
}

export const userCardsApi = {
  getUserCards: async (sortBy?: SortByProp) => {
    const token = getAuthToken();
    if (!token) return false;

    let url = `${getBackEndHost()}/users/me/user-cards`;
    if (sortBy && sortBy.field && sortBy.order) {
      const queryParams = new URLSearchParams({
        'sortBy[0][field]': sortBy.field,
        'sortBy[0][order]': sortBy.order,
      }).toString();

      url += `?${queryParams}`;
    }

    const response = await fetch(url, {
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
    return data;
  },
};
