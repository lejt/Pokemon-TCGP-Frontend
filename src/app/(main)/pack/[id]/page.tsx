'use client';

import { PackPageFooter } from '@/app/components/PackPageFooter';
import { PackPreview } from '@/app/components/PackPreview';
import { useOpenPack, usePackPreviewCards } from '@/app/hooks/cards';
import { useParams, useRouter } from 'next/navigation';
import { LoadingSpinner } from '@/app/components/LoadingSpinner';
import { OpenPackView } from '@/app/components/OpenPack';
import { useEffect, useState } from 'react';
import { getAuthToken } from '@/app/utils/local-storage';
import { useCardSetsAndPacks } from '@/app/hooks/cardSets';
import { CardSet, Pack } from '@/app/interfaces/entity.interface';
import Image from 'next/image';
import { getBackgroundColor } from '@/app/utils/styling';
import { LoadingPage } from '@/app/components/LoadingPage';

const PacksPage: React.FC = () => {
  const router = useRouter();
  const param = useParams();
  const token = getAuthToken();
  const { id } = param;

  const paramArr = typeof id === 'string' ? id.split('-') : [];
  const cardSetId = Number(paramArr[0]);
  const packId = Number(paramArr[1]);

  const {
    mutate,
    data: newCards,
    // error,
    isPending: isPendingOpeningPack,
    isSuccess,
  } = useOpenPack();
  const {
    data: previewCards,
    isLoading: isLoadingPreviewCards,
    // error: errorOnPreviewCards,
  } = usePackPreviewCards(cardSetId, packId);
  const {
    data: cardSetsAndPacks,
    // isLoading,
    // error
  } = useCardSetsAndPacks(); //TODO what is auth token already expired?

  const [cards, setCards] = useState(newCards);
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);

  useEffect(() => {
    if (!token) {
      router.push('/');
    }
  }, [token, router]);

  useEffect(() => {
    if (
      !Array.isArray(cardSetsAndPacks) &&
      cardSetsAndPacks?.message === 'Unauthorized'
    ) {
      router.push('/');
    }
  }, [cardSetsAndPacks, router]);

  useEffect(() => {
    if (isSuccess && newCards) {
      setCards(newCards); // Update state with newCards once the data is successfully fetched
    }
  }, [isSuccess, newCards]);

  if (!Array.isArray(cardSetsAndPacks)) {
    return <LoadingSpinner />;
  }

  if (!id) return null;

  const cardSetData = cardSetsAndPacks.find(
    (cardSet: CardSet) => cardSet.id === cardSetId
  );

  if (!cardSetData) {
    return;
  }
  const handleClick = () => {
    if (isAnyLoading) return;

    // Show the loading screen for 1.3s before loading new cards
    setShowLoadingScreen(true); // TODO: move to state management if implemented

    mutate({ cardSetId, packId });
    setTimeout(() => {
      setShowLoadingScreen(false);
    }, 1300);
  };

  const boosterImage =
    cardSetData.packs.find((pack: Pack) => pack.id === packId)?.image ??
    cardSetData.image;
  const cardSetName = cardSetData.name;

  const isCardsViewable = cards && cards.length > 0;
  const isAnyLoading = isPendingOpeningPack || isLoadingPreviewCards;
  const isOpeningPackView = isCardsViewable && !isAnyLoading;

  return (
    <div
      className={`relative flex flex-col flex-grow px-8 pt-8 h-full w-full border-x-2 border-black ${getBackgroundColor(
        cardSetName
      )}`}
    >
      {showLoadingScreen && <LoadingPage />}

      {isAnyLoading && <LoadingSpinner />}

      {!isCardsViewable && (
        <div className="h-full grid grid-rows-9 grid-cols-8 grid-flow-col gap-4">
          <div className="row-start-2 row-span-2 col-start-2 col-span-6 flex justify-center h-full">
            <PackPreview
              cards={previewCards}
              isLoading={isLoadingPreviewCards}
            />
          </div>
          {boosterImage && (
            <div className="row-start-4 row-span-4 col-start-3 col-span-4 relative flex justify-center items-center">
              <div className="relative h-full max-h-[400px] w-auto">
                <Image
                  src={boosterImage}
                  alt="booster pack image"
                  className="rounded-sm object-contain cursor-pointer animate-[var(--animate-vertical-wiggle)]"
                  priority
                  onClick={handleClick}
                  width={300}
                  height={400}
                  style={{
                    maxHeight: '100%',
                    width: 'auto',
                    margin: '0 auto',
                  }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
          )}
          <div className="absolute bottom-[120px] left-0 w-full">
            <PackPageFooter cardSetsAndPacks={cardSetsAndPacks} />
          </div>
        </div>
      )}

      {isOpeningPackView && <OpenPackView cards={cards} setCards={setCards} />}
    </div>
  );
};

export default PacksPage;
