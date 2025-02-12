'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/app/components/ui/card';
import { userCardsApi } from '@/app/services/api/user-cards';
import Image from 'next/image';
import { CardSortBubble } from '@/app/components/CardSortBubble';
import { SortField } from '@/app/constants/constants';
import { useMutation } from '@tanstack/react-query';
import { CardPageHeader } from '@/app/components/CardPageHeader';
import { CardOptions } from '@/app/components/CardOptions';
import { Skeleton } from '@/app/components/ui/skeleton';
import { UserCardToAllCardComparison } from '@/app/components/UserCardToAllCardComparison';

export interface SortOrderProp {
  field: string;
  order: 'ASC' | 'DESC';
}

const CardsPage: React.FC = () => {
  // TODO: copy over interface for userCards from backend
  const [userCards, setUserCards] = useState<any[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrderProp | null>(null);
  const [toggleFetch, setToggleFetch] = useState<boolean>(false);

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

  const isLoadingCards = fetchUserCards.isPending;
  const isRenderingUserCards = userCards && !toggleFetch;
  const isUserCardsEmpty = !userCards && fetchUserCards.isSuccess;
  const isComparingUserCardsToDB = userCards && toggleFetch;

  return (
    <div className="flex flex-col flex-grow w-full min-h-0">
      <CardPageHeader />
      <div className="px-3 z-3">
        <CardOptions
          count={userCards?.length}
          toggleFetch={toggleFetch}
          setToggleFetch={setToggleFetch}
        />

        {(isLoadingCards || isRenderingUserCards || isUserCardsEmpty) && (
          <Card className="relative flex-grow grid grid-cols-3 gap-3 place-items-center p-3 overflow-auto mb-[150px] mt-5 z-2">
            {isLoadingCards &&
              // arbitrary amount of skeleton cards loading
              [...Array(15)].map((e, i) => (
                <div key={i}>
                  <Skeleton className="h-[220px] w-[170px] rounded-xl" />
                </div>
              ))}

            {isRenderingUserCards &&
              userCards.map((userCard, idx) => (
                <Image
                  // TODO: find empty state card image
                  src={`${userCard.card.image}/low.png` ?? 'fallback-image-url'}
                  alt={userCard.card.name ?? 'Card image'}
                  width={200}
                  height={300}
                  key={idx}
                />
              ))}

            {isUserCardsEmpty && (
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
        )}

        {isComparingUserCardsToDB && (
          <Card className="relative flex-grow grid p-3 overflow-auto mb-[150px] mt-5 z-2">
            <UserCardToAllCardComparison userCards={userCards} />
          </Card>
        )}
      </div>
    </div>
  );
};

export default CardsPage;
