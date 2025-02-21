// components/UserCardToAllCardComparison.tsx
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Separator } from './ui/separator';
import { useAllCards } from '../hooks/userCards';
import { useRarityCounts } from '../hooks/cardSets';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { groupCardsByCardSet } from '../utils/groupCardsByCardSet';
import { calculateUserCardRarity } from '../utils/calculateRarity';
import { useToast } from '@/app/components/ui/hooks/use-toast';
import { CardSkeleton } from './CardSkeleton';
import { CardComparisonSkeletons } from './CardComparisonSkeletons';
import { Card, UserCard } from '../interfaces/entity.interface';
import { Card as CardComponent } from './ui/card';
import PokemonDiamondRarityIcon from '../assets/images/pokemon-diamond-rarity.svg';
import PokemonStarRarityIcon from '../assets/images/pokemon-star-rarity.svg';

interface UserCardToAllCardComparisonProps {
  userCards?: UserCard[];
}

export const UserCardToAllCardComparison: React.FC<
  UserCardToAllCardComparisonProps
> = ({ userCards = [] }) => {
  const [allCards, setAllCards] = useState<Card[]>([]);
  const { toast } = useToast();

  const {
    data: rarityCounts,
    isLoading: isLoadingRarityCount,
    error: errorinRarityFetch,
  } = useRarityCounts();

  const {
    data: allCardsData,
    isLoading: isLoadingAllCards,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useAllCards();

  useEffect(() => {
    if (!allCardsData || !allCardsData.pages) return;
    const newCards = allCardsData.pages.flatMap((page) => page?.data);

    if (newCards) setAllCards(newCards);
  }, [allCardsData]);

  const bottomRef = useInfiniteScroll(
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  );

  const groupedAllCards = groupCardsByCardSet(allCards);
  const userCardsRarityCount = calculateUserCardRarity(userCards);

  const showCardRarityCount = !isLoadingRarityCount;
  const loadingFetches = isLoadingRarityCount || isLoadingAllCards;

  if (errorinRarityFetch) {
    toast({
      title: rarityCounts.message,
    });
  }

  return (
    <>
      {loadingFetches && <CardComparisonSkeletons />}

      {Object.entries(groupedAllCards).map(
        ([cardSetId, { cardSet, cards }]) => (
          <div key={cardSetId} className="flex flex-col items-center">
            <div className="flex flex-col items-center">
              <Image
                src={`${cardSet.logo}.png`}
                alt={cardSet.name ?? 'Card image'}
                width={100}
                height={50}
                className="h-auto"
              />

              {showCardRarityCount && (
                <div className="flex justify-center mt-4">
                  <CardComponent className="px-2 flex justify-center items-center mr-4">
                    <Image
                      src={PokemonDiamondRarityIcon}
                      alt="card number sort icon"
                      width={10}
                      height={10}
                      className="mr-2 h-auto"
                    />
                    {userCardsRarityCount[`${cardSet.name}`]?.diamondCount ?? 0}
                    /{rarityCounts?.[`${cardSet.name}`]?.diamondCount ?? 0}
                  </CardComponent>
                  <CardComponent className="px-2 flex justify-center items-center">
                    <Image
                      src={PokemonStarRarityIcon}
                      alt="card number sort icon"
                      width={10}
                      height={10}
                      className="mr-2 h-auto"
                    />
                    {userCardsRarityCount[`${cardSet.name}`]?.starCount ?? 0}/
                    {rarityCounts?.[`${cardSet.name}`]?.starCount ?? 0}
                  </CardComponent>
                </div>
              )}
            </div>

            <Separator className="bg-black mt-3 h-1 mb-8" />

            <div className="grid grid-cols-5 gap-3 place-items-center mb-16">
              {cards?.map((card) => {
                const userCard = userCards.find((uc) => uc.card.id === card.id);

                return userCard ? (
                  <Image
                    key={card.id}
                    src={`${userCard.card.image}/low.png`}
                    alt={userCard.card.name ?? 'Card image'}
                    width={200}
                    height={300}
                    className="drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] h-auto"
                  />
                ) : (
                  <div
                    key={card.id}
                    className="h-[140px] w-[100px] shadow-[inset_3px_5px_5px_rgba(0,0,0,0.25)] bg-gray-100 rounded-lg text-stone-400 font-semibold text-2xl flex justify-center items-center"
                  >
                    {card.id}
                  </div>
                );
              })}

              {isFetchingNextPage &&
                [...Array(6)].map((_, i) => <CardSkeleton key={i} size="sm" />)}
            </div>
          </div>
        )
      )}

      <div ref={bottomRef}></div>
    </>
  );
};
