'use client';

import { PackPageFooter } from '@/app/components/PackPageFooter';
import { PackPreview } from '@/app/components/PackPreview';
import { useOpenPack, usePackPreviewCards } from '@/app/hooks/cards';
import { useParams } from 'next/navigation';
import { LoadingSpinner } from '@/app/components/LoadingSpinner';
import { OpenPackView } from '@/app/components/OpenPack';
import { useEffect, useState } from 'react';

const PacksPage: React.FC = () => {
  const param = useParams();
  const { id } = param;

  const paramArr = id?.split('-') || [];
  const cardSetId = Number(paramArr[0]);
  const packId = Number(paramArr[1]);

  const {
    mutate,
    data: newCards,
    error,
    isPending: isPendingOpeningPack,
    isSuccess,
  } = useOpenPack();
  const {
    data: previewCards,
    isLoading: isLoadingPreviewCards,
    error: errorOnPreviewCards,
  } = usePackPreviewCards(cardSetId, packId);

  const [cards, setCards] = useState(newCards);

  useEffect(() => {
    if (isSuccess && newCards) {
      setCards(newCards); // Update state with newCards once the data is successfully fetched
    }
  }, [isSuccess, newCards]);

  if (!id) return null;

  const isCardsViewable = cards && cards.length > 0;
  const isAnyLoading = isPendingOpeningPack || isLoadingPreviewCards;
  const isOpeningPackView = isCardsViewable && !isAnyLoading;

  const handleClick = () => {
    if (isAnyLoading) return;
    mutate({ cardSetId, packId });
  };

  return (
    <div className="relative flex flex-col flex-grow h-full w-full justify-center items-center mb-24 bg-[linear-gradient(354deg,_rgba(255,255,255,1)_0%,_rgba(255,255,255,1)_45%,_rgba(81,215,207,1)_40%,_rgba(106,255,246,1)_70%,_rgba(91,176,255,1)_90%)]">
      {isAnyLoading && <LoadingSpinner />}

      {!isCardsViewable && (
        <>
          <PackPreview cards={previewCards} isLoading={isLoadingPreviewCards} />
          <div
            className="bg-gray-400 w-[300px] h-[500px] rounded-xl flex justify-center items-center cursor-pointer"
            onClick={handleClick}
          >
            booster image here
          </div>
          <div className="absolute bottom-0">
            <PackPageFooter />
          </div>
        </>
      )}

      {isOpeningPackView && <OpenPackView cards={cards} setCards={setCards} />}
    </div>
  );
};

export default PacksPage;
