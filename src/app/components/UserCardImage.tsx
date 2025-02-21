import React from 'react';
import Image from 'next/image';
import { UserCard } from '../interfaces/entity.interface';

export const UserCardImage: React.FC<{
  userCard: UserCard;
  large?: boolean;
  showQuantity?: boolean;
}> = ({ userCard, large = false, showQuantity = false }) => {
  return (
    <div className="relative">
      <Image
        src={`${userCard.card.image}/${large ? 'high' : 'low'}.png`}
        alt={userCard.card.name ?? 'Card image'}
        width={large ? 400 : 200}
        height={300}
        className={`drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] h-auto ${
          large ? '' : 'cursor-pointer'
        }`}
      />
      {showQuantity && (
        <div className="absolute bottom-0 right-0 bg-gray-700 text-white text-base rounded-tl-2xl rounded-br-lg w-[75px] h-auto flex justify-center">
          {userCard.quantity}
        </div>
      )}
    </div>
  );
};
