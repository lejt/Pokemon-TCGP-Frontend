'use client';

import { useEffect, useRef, useState } from 'react';
import { Card } from '@/app/components/ui/card';
import { userCardsApi } from '@/app/services/api/user-cards';
import { CardSortBubble } from '@/app/components/CardSortBubble';
import { SortField } from '@/app/constants/constants';
import { useMutation } from '@tanstack/react-query';
import { CardPageHeader } from '@/app/components/CardPageHeader';
import { CardOptions } from '@/app/components/CardOptions';
import { UserCardToAllCardComparison } from '@/app/components/UserCardToAllCardComparison';
import { CardSkeleton } from '@/app/components/CardSkeleton';
import { UserCard } from '@/app/interfaces/entity.interface';
import { UserCardImage } from '@/app/components/UserCardImage';
import { CustomDrawer } from '@/app/components/CustomDrawer';
import { CardDetails } from '@/app/components/CardDetails';
import { useRouter } from 'next/navigation';
import { getAuthToken } from '@/app/utils/local-storage';
export interface SortOrderProp {
  field: string;
  order: string;
}

const CardsPage: React.FC = () => {
  const [userCards, setUserCards] = useState<UserCard[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrderProp | null>(null);
  const [toggleFetch, setToggleFetch] = useState<boolean>(false);
  const router = useRouter();
  const token = getAuthToken();

  useEffect(() => {
    if (!token) {
      router.push('/');
    }
  }, [router, token]);

  // TODO: may consider using useQuery instead since it is better for fetching while mutation is for modifying
  const fetchUserCards = useMutation({
    mutationFn: async () => {
      return await userCardsApi.getUserCards({
        field: sortOrder?.field,
        order: sortOrder?.order,
      });
    },
    onSuccess: (data) => {
      if (!Array.isArray(data)) {
        if (data.message) router.push('/');
      } else {
        setUserCards(data);
      }
    },
  });

  useEffect(() => {
    fetchUserCards.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOrder]);

  const handleSort = (sortName: string) => {
    let sortBy = '';
    let defaultOrder = 'DESC';

    Object.entries(SortField).forEach(([key, value]) => {
      if (value === sortName) {
        sortBy = key;
        if (sortBy === 'id' || sortBy === 'types') {
          defaultOrder = 'ASC';
        }
      }
    });

    if (sortBy === sortOrder?.field) {
      setSortOrder({
        field: sortBy,
        order: sortOrder.order === 'ASC' ? 'DESC' : 'ASC',
      });
    } else {
      setSortOrder({ field: sortBy, order: defaultOrder });
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

  const userCardCount = userCards.reduce((acc, card) => acc + card.quantity, 0);

  const isLoadingCards = fetchUserCards.isPending;
  const isUserCardsReady = userCards && userCards.length > 0;
  const isRenderingUserCards = isUserCardsReady && !toggleFetch;
  const isUserCardsEmpty = !userCards.length && fetchUserCards.isSuccess;
  const isComparingUserCardsToDB = isUserCardsReady && toggleFetch;

  return (
    <div className="flex flex-col flex-grow w-full relative">
      <CardPageHeader />
      <div className="relative px-3 z-3 flex flex-col flex-grow w-full justify-center items-center border-x-2 border-black bg-gray-300">
        <CardOptions
          count={userCardCount}
          toggleFetch={toggleFetch}
          setToggleFetch={setToggleFetch}
        />

        {/* Have two CardSortBubbles, initial one behaves with position: fixed, later one position: absolute */}
        {userCards.length > 0 && (
          <div
            className={`${
              isElementFixed
                ? 'fixed bottom-[120px] left-[50%] ml-48'
                : 'hidden'
            } max-w-[600px] flex justify-center z-50`}
          >
            {!toggleFetch && (
              <CardSortBubble handleSort={handleSort} sortOrder={sortOrder} />
            )}
          </div>
        )}

        {(isLoadingCards || isRenderingUserCards || isUserCardsEmpty) && (
          <Card
            ref={containerRef}
            className="w-full grid grid-cols-3 gap-3 place-items-center p-3 mb-[150px] mt-5 shadow-[5px_10px_10px_rgba(0,0,0,0.5)] z-2"
          >
            {isLoadingCards &&
              // arbitrary amount of skeleton cards loading
              [...Array(15)].map((e, i) => <CardSkeleton key={i} />)}

            {isRenderingUserCards && //TODO: consider pagination for user cards
              userCards.map((userCard, idx) => (
                <CustomDrawer
                  key={idx}
                  headerText={'Card details'}
                  drawerTriggerChildren={
                    <UserCardImage userCard={userCard} showQuantity={true} />
                  }
                  drawerContentChildren={<CardDetails userCard={userCard} />}
                />
              ))}

            {isUserCardsEmpty && (
              <div className="col-span-3">
                <span className="text-sm text-gray-500">
                  You have no cards collected. Open a pack of cards to start!
                </span>
              </div>
            )}

            {userCards && ( // TODO: move CardSortBubble to layout layer and use state management for sortOrder state
              <div
                className={`${
                  isElementFixed ? 'hidden' : 'absolute bottom-[180px] right-8'
                } max-w-[600px] flex justify-center z-50`}
              >
                {!toggleFetch && (
                  <CardSortBubble
                    handleSort={handleSort}
                    sortOrder={sortOrder}
                  />
                )}
              </div>
            )}
          </Card>
        )}

        {isComparingUserCardsToDB && (
          <Card className="relative flex-grow grid p-3 overflow-auto mb-[150px] mt-5 z-2 drop-shadow-xl w-full">
            <UserCardToAllCardComparison userCards={userCards} />
          </Card>
        )}
      </div>
    </div>
  );
};

export default CardsPage;
