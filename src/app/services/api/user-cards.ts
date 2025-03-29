import { getHost } from '@/app/constants/constants';
import { makeProtectedGetRequest } from '@/app/utils/makeRequest';

interface SortByProp {
  field?: string;
  order?: string;
}

export const userCardsApi = {
  getUserCards: async (sortBy?: SortByProp) => {
    let url = `${getHost()}/users/me/user-cards`;
    if (sortBy && sortBy.field && sortBy.order) {
      const queryParams = new URLSearchParams({
        'sortBy[0][field]': sortBy.field,
        'sortBy[0][order]': sortBy.order,
      }).toString();

      url += `?${queryParams}`;
    }

    return makeProtectedGetRequest(
      url,
      'Failed to load cards from user. Try again later'
    );
  },
};
