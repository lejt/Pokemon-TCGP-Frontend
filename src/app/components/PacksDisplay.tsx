/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { useCardSetsAndPacks } from '../hooks/cardSets';
import { useRouter } from 'next/navigation';
import { Card } from './ui/card';
import { useDragScroll } from '../hooks/useDragScroll';
import { getAuthToken } from '../utils/local-storage';

export const PacksDisplay: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.push('/');
    }
  }, [router]);

  const { data: cardSetsAndPacks } = useCardSetsAndPacks();

  const {
    scrollRef,
    isDragging,
    clickPrevent,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useDragScroll();

  if (!Array.isArray(cardSetsAndPacks)) return;

  const handlePackClick = (packId: string) => {
    if (clickPrevent) return;
    router.push(`/pack/${packId}`);
  };

  const cardsClassName =
    'min-w-[150px] h-[250px] bg-indigo-200 rounded-xl cursor-pointer flex justify-center items-center select-none';

  return (
    <Card
      ref={scrollRef}
      className={`w-full flex gap-4 mb-20 p-4 overflow-x-auto shadow-[5px_10px_25px_rgba(0,0,0,0.5)] cursor-grab rounded-tl-3xl
        ${isDragging ? 'cursor-grabbing' : ''}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      onMouseUp={handleMouseUp}
    >
      {cardSetsAndPacks.map((cardSet) =>
        cardSet.packs.length > 0 ? (
          cardSet.packs.map(
            (
              pack: any // TODO: update type and remove lint-ignore at top
            ) => (
              <div
                key={`${cardSet.id}-${pack.id}`}
                className={cardsClassName}
                onClick={() => handlePackClick(`${cardSet.id}-${pack.id}`)}
              >
                <div className="text-center">{pack.image}</div>
              </div>
            )
          )
        ) : (
          <div
            key={`${cardSet.id}`}
            className={cardsClassName}
            onClick={() => handlePackClick(`${cardSet.id}-0`)}
          >
            <div> {cardSet.id}</div>
          </div>
        )
      )}
    </Card>
  );
};
