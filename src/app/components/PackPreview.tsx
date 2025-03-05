import React from 'react';
import { Card as CardComponent } from './ui/card';
import { Card } from '../interfaces/entity.interface';
import Image from 'next/image';
import { CardSkeleton } from './CardSkeleton';
import { useDragScroll } from '../hooks/useDragScroll';

interface PackPreviewProps {
  cards?: Card[];
  isLoading: boolean;
}

export const PackPreview: React.FC<PackPreviewProps> = ({
  cards = [],
  isLoading,
}) => {
  const {
    scrollRef,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useDragScroll();

  return (
    <CardComponent
      ref={scrollRef}
      className={`max-w-[500px] w-full rounded-3xl flex justify-start gap-2 overflow-x-auto shadow-[inset_5px_5px_10px_rgba(0,0,0,0.5)] border-none px-4 cursor-grab select-none ${
        isDragging ? 'cursor-grabbing' : ''
      }`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      onMouseUp={handleMouseUp}
    >
      {cards?.length > 0
        ? [...cards]
            .sort((a, b) => b.id - a.id)
            .map((card, idx) => (
              <div key={card.id} className="relative min-w-[20%]">
                <Image
                  src={`${card.image}/low.png`}
                  alt={`preview card number ${idx}`}
                  className="object-contain"
                  draggable={false}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))
        : isLoading &&
          [...Array(6)].map((_, i) => (
            <div key={i} className="flex justify-center items-center">
              <CardSkeleton size="sm" />
            </div>
          ))}
    </CardComponent>
  );
};
