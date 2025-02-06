'use client';

import { useEffect, useState } from 'react';
import { MenuFooter } from '../components/MenuFooter';
import { Card } from '../components/ui/card';
import { UserMenuHeader } from '../components/UserMenuHeader';
import { userCardsApi } from '../services/api/user-cards';
import Image from 'next/image';

const CardsPage: React.FC = () => {
  const [userCards, setUserCards] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const data = await userCardsApi.getUserCards();
      setUserCards(data);
    })();
  }, []);

  return (
    <div className="bg-blue-500 flex flex-col h-dvh w-full items-center justify-center">
      <UserMenuHeader />
      <Card className="mt-[200px] mb-[200px] h-auto w-[600px] overflow-auto p-4 flex flex-wrap justify-center">
        {userCards &&
          userCards.map((userCard, index) => (
            <Image
              src={`${userCard.card.image}/low.png` ?? 'fallback-image-url'}
              alt={userCard.card.name ?? 'Card image'}
              width={100}
              height={100}
              key={index}
            />
          ))}
      </Card>

      <MenuFooter />
    </div>
  );
};

export default CardsPage;
