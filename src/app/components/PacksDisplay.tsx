import React from 'react';
import { useCardSetsAndPacks } from '../hooks/cardSets';
import { useRouter } from 'next/navigation';
import { Card } from './ui/card';
import { useDragScroll } from '../hooks/useDragScroll';

export const PacksDisplay: React.FC = () => {
  const { data: cardSetsAndPacks } = useCardSetsAndPacks();
  const router = useRouter();
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
      className={`h-full w-full flex gap-4 mb-20 p-4 overflow-x-auto shadow-[5px_10px_25px_rgba(0,0,0,0.5)] cursor-grab select-none ${
        isDragging ? 'cursor-grabbing' : ''
      }`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      onMouseUp={handleMouseUp}
    >
      {cardSetsAndPacks.map((cardSet) =>
        cardSet.packs.length > 0 ? (
          cardSet.packs.map((pack) => (
            <div
              key={`${cardSet.id}-${pack.id}`}
              className={cardsClassName}
              onClick={() => handlePackClick(`${cardSet.id}-${pack.id}`)}
            >
              <p className="text-center">{pack.image}</p>
            </div>
          ))
        ) : (
          <div
            key={`${cardSet.id}`}
            className={cardsClassName}
            onClick={() => handlePackClick(`${cardSet.id}-0`)}
          >
            <p> {cardSet.id}</p>
          </div>
        )
      )}
    </Card>
  );
};
