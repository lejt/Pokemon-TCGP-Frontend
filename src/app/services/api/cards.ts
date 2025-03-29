import { getHost } from '@/app/constants/constants';
import {
  makeProtectedGetRequest,
  makeProtectedPostRequest,
} from '@/app/utils/makeRequest';

export const cardsApi = {
  getAllCards: async (paginationProp: { page: number; limit: number }) => {
    const { page, limit } = paginationProp;
    const url = `${getHost()}/cards?page=${page}&limit=${limit}`;

    return makeProtectedGetRequest(
      url,
      'Failed to load card database. Try again later'
    );
  },
  getRarityCountBasedOnCardSets: async () => {
    const url = `${getHost()}/cards/rarity-count`;
    return makeProtectedGetRequest(
      url,
      'Failed to get rarity counts. Try again later'
    );
  },
  getPackPreviewCards: async (cardSetId: number, packId: number) => {
    const url = `${getHost()}/cards/pack-preview?cardSetId=${cardSetId}&packId=${packId}`;
    return makeProtectedGetRequest(
      url,
      'Failed to get cards from pack preview. Try again later'
    );
  },
  openPack: async (cardSetId: number, packId: number | null) => {
    const url = `${getHost()}/cards/generate-pack`;
    return makeProtectedPostRequest(
      url,
      { cardSetId, packId },
      'Failed to open a pack. Try again later'
    );
  },
};
