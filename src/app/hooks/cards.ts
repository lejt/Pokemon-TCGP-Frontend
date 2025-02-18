'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { cardsApi } from '../services/api/cards';

export const useOpenPack = () => {
  return useMutation({
    mutationFn: async ({
      cardSetId,
      packId,
    }: {
      cardSetId: number;
      packId: number | null;
    }) => {
      return await cardsApi.openPack(cardSetId, packId);
    },
  });
};

export const usePackPreviewCards = (cardSetId: number, packId: number) => {
  return useQuery({
    queryKey: ['packPreviewCards', cardSetId, packId],
    queryFn: async () => {
      return await cardsApi.getPackPreviewCards(cardSetId, packId);
    },
    enabled: !!cardSetId,
  });
};
