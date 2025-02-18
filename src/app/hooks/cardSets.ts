'use client';

import { useQuery } from '@tanstack/react-query';
import { cardsApi } from '../services/api/cards';
import { cardSetsApi } from '../services/api/card-sets';

export const useRarityCounts = () => {
  return useQuery({
    queryKey: ['rarityCounts'],
    queryFn: async () => await cardsApi.getRarityCountBasedOnCardSets(),
  });
};

export const useCardSetsAndPacks = () => {
  return useQuery({
    queryKey: ['cardSetsAndPacks'],
    queryFn: async () => await cardSetsApi.getAllCardSetsAndPacks(),
  });
};
