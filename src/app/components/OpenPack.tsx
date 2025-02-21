import { Card } from '@/app/interfaces/entity.interface';
import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { useCardDrag } from '../hooks/useDragCard';
import Image from 'next/image';

interface OpenPackPageProps {
  cards: Card[];
  setCards: Dispatch<SetStateAction<Card[]>>;
}

export const OpenPackPage: React.FC<OpenPackPageProps> = ({
  cards,
  setCards,
}) => {
  const [cardPositions, setCardPositions] = useState<{
    [key: number]: { x: number; y: number };
  }>({});
  const [revealedCards, setRevealedCards] = useState<boolean[]>(
    Array(cards.length).fill(false)
  );

  const { handleMouseDown } = useCardDrag(cards, setCards, setCardPositions);

  useEffect(() => {
    if (!cards.length) return;

    // Reveal each card in order with a delay
    cards.forEach((_, index) => {
      setTimeout(() => {
        setRevealedCards((prev) => {
          const updated = [...prev];
          updated[index] = true;
          return updated;
        });
      }, index * 200); // Adjust delay per card
    });
  }, [cards]);

  if (!cards) return null;

  return (
    <div className="mb-[150px] flex flex-col flex-grow h-full w-full justify-center items-center">
      <div className="relative flex justify-center items-center">
        {cards.map((card, i) => {
          if (!revealedCards[i]) return null; // Don't render until previous is shown
          const cardPosition = cardPositions[i];
          const isCardBeingDragged = cardPosition !== undefined;

          return (
            <Image
              key={i}
              src={`${card.image}/low.png`}
              width={150}
              height={250}
              alt={`card ${i + 1}: ${card.name}`}
              className={`absolute min-w-[300px] h-[300px] ${
                isCardBeingDragged ? 'cursor-grabbing' : ''
              } 
              drop-shadow-lg transition-opacity duration-500 ease-in-out`}
              style={{
                zIndex: cards.length - i,
                opacity: revealedCards[i] ? 1 : 0, // Fade in effect
                transform: `translate(${cardPosition?.x || 0}px, ${
                  cardPosition?.y || 0
                }px) translateZ(${i * 5}px) translateY(${
                  i * 10
                }px) translateX(${i * -5}px)`,
                willChange: 'transform',
                height: 'auto',
              }}
              onMouseDown={(e) => handleMouseDown(e, i)}
            />
          );
        })}
      </div>
    </div>
  );
};
