import { useInfiniteQuery } from '@tanstack/react-query';
import { cardsApi } from '../services/api/cards';

export const useAllCards = () => {
  return useInfiniteQuery({
    queryKey: ['allCards'],
    queryFn: async ({ pageParam = 1 }) => {
      return await cardsApi.getAllCards({ limit: 100, page: pageParam });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage?.pagination?.nextPage;
      const totalPages = lastPage?.pagination?.totalPages;

      return lastPage?.pagination?.currentPage >= totalPages
        ? undefined
        : nextPage;
    },
  });
};
