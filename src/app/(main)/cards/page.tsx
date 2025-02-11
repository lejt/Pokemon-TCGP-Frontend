'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/app/components/ui/card';
import { userCardsApi } from '@/app/services/api/user-cards';
import Image from 'next/image';
import { CardSortBubble } from '@/app/components/CardSortBubble';
import { CARDS_SORT_CATEGORY } from '@/app/constants/constants';
import { useMutation } from '@tanstack/react-query';
import { CardPageHeader } from '@/app/components/CardPageHeader';
import { CardOptions } from '@/app/components/CardOptions';
import { Skeleton } from '@/app/components/ui/skeleton';

export interface SortOrderProp {
  field: string;
  order: 'ASC' | 'DESC';
}

const CardsPage: React.FC = () => {
  // TODO: copy over interface for userCards from backend
  const [userCards, setUserCards] = useState<any[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrderProp | null>(null);

  const fetchUserCards = useMutation({
    mutationFn: async () => {
      return await userCardsApi.getUserCards({
        field: sortOrder?.field,
        order: sortOrder?.order,
      });
    },
    onSuccess: (data) => {
      setUserCards(data);
    },
  });

  useEffect(() => {
    fetchUserCards.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOrder]);

  const SortField = {
    id: CARDS_SORT_CATEGORY.CARD_COLLECTION_NUMBER,
    types: CARDS_SORT_CATEGORY.TYPES,
    rarity: CARDS_SORT_CATEGORY.RARITY,
    updatedAt: CARDS_SORT_CATEGORY.RECENCY,
    quantity: CARDS_SORT_CATEGORY.DUPLICATES,
  };

  const handleSort = (sortName: string) => {
    let sortBy = '';
    Object.entries(SortField).map((field) => {
      if (field[1] === sortName) {
        sortBy = field[0];
      }
    });
    if (sortBy === sortOrder?.field) {
      setSortOrder({
        field: sortBy,
        order: sortOrder.order === 'ASC' ? 'DESC' : 'ASC',
      });
    } else {
      setSortOrder({ field: sortBy, order: 'ASC' });
    }
  };

  return (
    <div className="flex flex-col flex-grow w-full min-h-0">
      <CardPageHeader />
      <div className="px-3 z-3">
        <CardOptions count={userCards?.length} />
        <Card className="relative flex-grow grid grid-cols-3 gap-3 place-items-center p-3 overflow-auto mb-[150px] mt-5 z-2">
          {fetchUserCards.isPending &&
            // arbitrary amount of skeleton cards loading
            [...Array(15)].map((e, i) => (
              <div key={i}>
                <Skeleton className="h-[220px] w-[170px] rounded-xl" />
              </div>
            ))}

          {userCards &&
            userCards.map((userCard, index) => (
              <Image
                // TODO: find empty state card image
                src={`${userCard.card.image}/low.png` ?? 'fallback-image-url'}
                alt={userCard.card.name ?? 'Card image'}
                width={200}
                height={300}
                key={index}
              />
            ))}

          {!userCards && fetchUserCards.isSuccess && (
            <div className="col-span-3">
              <span>
                You have no cards collected. Open a pack of cards to start!
              </span>
            </div>
          )}

          {/* TODO: move CardSortBubble to layout layer and use state management for sortOrder state */}

          {userCards && (
            <CardSortBubble
              className="absolute right-2 bottom-5"
              handleSort={handleSort}
              sortOrder={sortOrder}
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default CardsPage;
