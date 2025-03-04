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

  useEffect(() => {
    if (!token) {
      router.push('/');
    }
  }, [router, token]);

  useEffect(() => {
    if (isSuccess && newCards) {
      setCards(newCards); // Update state with newCards once the data is successfully fetched
    }
  }, [isSuccess, newCards]);

  if (!id) return null;
  if (!Array.isArray(cardSetsAndPacks)) {
    if (cardSetsAndPacks && cardSetsAndPacks.message) {
      if (cardSetsAndPacks.message === 'Unauthorized') {
        router.push('/');
      }
    }
    return;
  }

  const isCardsViewable = cards && cards.length > 0;
  const isAnyLoading = isPendingOpeningPack || isLoadingPreviewCards;
  const isOpeningPackView = isCardsViewable && !isAnyLoading;

  const handleClick = () => {
    if (isAnyLoading) return;
    mutate({ cardSetId, packId });
  };

  const boosterImage =
    cardSetsAndPacks
      ?.find((cardSet: CardSet) => cardSet.id === cardSetId)
      ?.packs.find((pack: Pack) => pack.id === packId)?.image ??
    cardSetsAndPacks?.find((cardSet: CardSet) => cardSet.id === cardSetId)
      ?.image;

  return (
    <div className="relative flex flex-col flex-grow px-8 pt-8 h-full w-full bg-[linear-gradient(354deg,_rgba(255,255,255,1)_0%,_rgba(255,255,255,1)_55%,_rgba(81,215,207,1)_40%,_rgba(106,255,246,1)_70%,_rgba(91,176,255,1)_90%)] border-x-2 border-black">
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
                  className="rounded-sm object-contain cursor-pointer"
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
