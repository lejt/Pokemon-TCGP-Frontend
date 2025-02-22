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
      className={`w-[450px] min-h-[200px] rounded-3xl mb-5 border-8 bg-white flex gap-2 p-4 overflow-x-auto drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] shadow-[inset_5px_5px_10px_rgba(0,0,0,0.5)] cursor-grab select-none ${
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
              <Image
                src={`${card.image}/low.png`}
                width={100}
                height={140}
                alt={`preview card number ${idx}`}
                key={card.id}
                className="shadow-xl"
                draggable={false}
                style={{ width: '100px', height: '140px' }}
                priority
              />
            ))
        : isLoading &&
          [...Array(6)].map((_, i) => <CardSkeleton key={i} size="sm" />)}
    </CardComponent>
  );
};
