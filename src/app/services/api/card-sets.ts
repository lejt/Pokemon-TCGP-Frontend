import { getHost } from '@/app/constants/constants';
import { makeProtectedGetRequest } from '@/app/utils/makeRequest';

export const cardSetsApi = {
  getAllCardSetsAndPacks: async () => {
    const url = `${getHost()}/card-sets`;
    return makeProtectedGetRequest(
      url,
      'Failed to load card sets database. Try again later'
    );
  },
};
