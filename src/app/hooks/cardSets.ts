import { useQuery } from '@tanstack/react-query';
import { cardsApi } from '../services/api/cards';

export const useRarityCounts = () => {
  return useQuery({
    queryKey: ['rarityCounts'],
    queryFn: async () => await cardsApi.getRarityCountBasedOnCardSets(),
  });
};
