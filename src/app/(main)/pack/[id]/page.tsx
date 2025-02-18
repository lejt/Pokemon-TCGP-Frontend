'use client';

import { CardSkeleton } from '@/app/components/CardSkeleton';
import { PackPageFooter } from '@/app/components/PackPageFooter';
import { PackPreview } from '@/app/components/PackPreview';
import { useOpenPack, usePackPreviewCards } from '@/app/hooks/cards';
import { useParams } from 'next/navigation';

const PacksPage: React.FC = () => {
  const param = useParams();
  const { id } = param;

  const paramArr = id?.split('-') || [];
  const cardSetId = Number(paramArr[0]);
  const packId = Number(paramArr[1]);

  const { mutate, data: newCards, isLoading, error } = useOpenPack();
  const {
    data: previewCards,
    isLoading: isLoadingPreviewCards,
    error: errorOnPreviewCards,
  } = usePackPreviewCards(cardSetId, packId);

  if (!id) return null;

  const handleClick = () => {
    mutate({ cardSetId, packId });
  };

  return (
    <div className="relative flex flex-col flex-grow h-full w-full justify-center items-center bg-[linear-gradient(354deg,_rgba(255,255,255,1)_0%,_rgba(255,255,255,1)_45%,_rgba(81,215,207,1)_40%,_rgba(106,255,246,1)_70%,_rgba(91,176,255,1)_90%)]">
      <PackPreview cards={previewCards} isLoading={isLoadingPreviewCards} />
      <div onClick={handleClick} className="cursor-pointer">
        {isLoading ? (
          <CardSkeleton />
        ) : newCards ? (
          <div>{JSON.stringify(newCards)}</div>
        ) : (
          <div className="bg-gray-400 w-[300px] h-[480px] rounded-xl flex justify-center items-center">
            booster image here
          </div>
        )}
      </div>
      <div className="absolute bottom-32">
        <PackPageFooter />
      </div>
    </div>
  );
};

export default PacksPage;
