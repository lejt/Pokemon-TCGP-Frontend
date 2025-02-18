'use client';

import { useEffect, useRef, useState } from 'react';
import { Card } from '@/app/components/ui/card';
import { userCardsApi } from '@/app/services/api/user-cards';
import Image from 'next/image';
import { CardSortBubble } from '@/app/components/CardSortBubble';
import { SortField } from '@/app/constants/constants';
import { useMutation } from '@tanstack/react-query';
import { CardPageHeader } from '@/app/components/CardPageHeader';
import { CardOptions } from '@/app/components/CardOptions';
import { UserCardToAllCardComparison } from '@/app/components/UserCardToAllCardComparison';
import { CardSkeleton } from '@/app/components/CardSkeleton';
import { UserCard } from '@/app/interfaces/entity.interface';

export interface SortOrderProp {
  field: string;
  order: 'ASC' | 'DESC';
}

const CardsPage: React.FC = () => {
  const [userCards, setUserCards] = useState<UserCard[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrderProp | null>(null);
  const [toggleFetch, setToggleFetch] = useState<boolean>(false);

  // TODO: may consider using useQuery instead since it is better for fetching while mutation is for modifying
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

    Object.entries(SortField).forEach(([key, value]) => {
      if (value === sortName) {
        sortBy = key;
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

  const [isElementFixed, setIsElementFixed] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const cardBottom = containerRef.current.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;

      // at bottom of page, switch render of CardSortBubble
      if (cardBottom <= windowHeight) {
        setIsElementFixed(false);
      } else {
        setIsElementFixed(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLoadingCards = fetchUserCards.isPending;
  const isRenderingUserCards = userCards && !toggleFetch;
  const isUserCardsEmpty = !userCards.length && fetchUserCards.isSuccess;
  const isComparingUserCardsToDB = userCards && toggleFetch;

  return (
    <div className="flex flex-col flex-grow h-full w-full">
      <CardPageHeader />
      <div className="relative pt-[50px] px-3 z-3 flex flex-col flex-grow w-full justify-center items-center">
        <CardOptions
          count={userCards?.length}
          toggleFetch={toggleFetch}
          setToggleFetch={setToggleFetch}
        />

        {/* Have two CardSortBubbles, initial one behaves with position: fixed, later one position: absolute */}
        {userCards.length > 0 && (
          <div
            className={`${
              isElementFixed ? 'fixed top-[88%] left-[50%] ml-48' : 'hidden'
            } max-w-[600px] flex justify-center z-50`}
          >
            <CardSortBubble handleSort={handleSort} sortOrder={sortOrder} />
          </div>
        )}

        {(isLoadingCards || isRenderingUserCards || isUserCardsEmpty) && (
          <Card
            ref={containerRef}
            className="w-full grid grid-cols-3 gap-3 place-items-center p-3 mb-[250px] mt-5 drop-shadow-xl z-2"
          >
            {isLoadingCards &&
              // arbitrary amount of skeleton cards loading
              [...Array(15)].map((e, i) => <CardSkeleton key={i} />)}

            {/* TODO: consider pagination for user cards */}
            {isRenderingUserCards &&
              userCards.map((userCard, idx) => (
                <div key={idx} className="relative">
                  <Image
                    // TODO: find empty state card image
                    src={`${userCard.card.image}/low.png`}
                    alt={userCard.card.name ?? 'Card image'}
                    width={200}
                    height={300}
                    className="drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]"
                  />
                  <div className="absolute bottom-0 right-0 bg-gray-700 text-white text-base rounded-tl-2xl rounded-br-lg w-[75px] h-auto flex justify-center ">
                    {userCard.quantity}
                  </div>
                </div>
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
              <div
                className={`${
                  isElementFixed ? 'hidden' : 'absolute bottom-10 right-6'
                } max-w-[600px] flex justify-center z-50`}
              >
                <CardSortBubble handleSort={handleSort} sortOrder={sortOrder} />
              </div>
            )}
          </Card>
        )}

        {isComparingUserCardsToDB && (
          <Card className="relative flex-grow grid p-3 overflow-auto mb-[150px] mt-5 z-2 drop-shadow-xl">
            <UserCardToAllCardComparison userCards={userCards} />
          </Card>
        )}
      </div>
    </div>
  );
};

export default CardsPage;
