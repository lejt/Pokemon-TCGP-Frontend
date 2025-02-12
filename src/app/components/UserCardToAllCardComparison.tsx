import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useInfiniteQuery } from '@tanstack/react-query';
import { cardsApi } from '../services/api/cards';
import { Separator } from './ui/separator';

interface UserCardToAllCardComparisonProps {
  userCards?: any[];
}

// TODO: fill types
export const UserCardToAllCardComparison: React.FC<
  UserCardToAllCardComparisonProps
> = (props) => {
  const { userCards } = props;
  const [allCards, setAllCards] = useState<any[]>([]);

  const {
    data: allCardsData,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['allCards'],
    queryFn: async ({ pageParam = 1 }) => {
      return await cardsApi.getAllCards({ limit: 100, page: pageParam });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage?.pagination?.nextPage;
      const totalPages = lastPage?.pagination?.totalPages;
      // TODO: still doesn't work for final page
      if (!nextPage || nextPage >= totalPages) {
        return undefined;
      }

      return nextPage;
    },
  });

  // TODO: still might not have page.data
  useEffect(() => {
    if (!allCardsData || !allCardsData.pages) return;

    const newCards = allCardsData.pages.flatMap((page) => page.data);
    setAllCards(newCards);
  }, [allCardsData]);

  const bottomRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (bottomRef.current) {
      const bottom =
        bottomRef.current.getBoundingClientRect().bottom <=
        window.innerHeight + 50;
      if (bottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Set up scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Grouping allCards by card Set
  const groupedAllCards = allCards?.reduce((acc, card) => {
    const cardSetId = card.cardSet.id;
    if (!acc[cardSetId]) {
      acc[cardSetId] = {
        cardSet: {
          id: card.cardSet.id,
          name: card.cardSet.name,
          externalId: card.cardSet.externalId,
          logo: card.cardSet.logo,
        },
        cards: [],
      };
    }
    acc[cardSetId].cards.push(card);
    return acc;
  }, {} as { [key: string]: { cardSet: any; cards: any[] } });

  return (
    <>
      {Object.entries(groupedAllCards).map(
        ([cardSetId, { cardSet, cards }]) => (
          <div key={cardSetId} className="flex flex-col items-center">
            <Image
              src={`${cardSet.logo}.png` ?? 'fallback-image-url'}
              alt={cardSet.name ?? 'Card image'}
              width={100}
              height={50}
            />
            <Separator className="bg-black mt-3 h-1 mb-8" />
            <div className="card-set grid grid-cols-3 gap-3 place-items-center mb-16">
              {cards?.map((card) => {
                const userCard = userCards.find((uc) => uc.card.id === card.id);

                if (userCard) {
                  return (
                    <div key={card.id}>
                      <Image
                        src={
                          `${userCard.card.image}/low.png` ??
                          'fallback-image-url'
                        }
                        alt={userCard.card.name ?? 'Card image'}
                        width={200}
                        height={300}
                      />
                    </div>
                  );
                }

                return (
                  <div
                    key={card.id}
                    className="h-[245px] w-[170px] bg-gray-300 rounded-xl flex justify-center items-center"
                  >
                    {card.id}
                  </div>
                );
              })}
            </div>
          </div>
        )
      )}

      <div ref={bottomRef}></div>
    </>
  );
};
