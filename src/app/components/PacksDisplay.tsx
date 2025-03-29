import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCardSetsAndPacks } from '../hooks/cardSets';
import { useRouter } from 'next/navigation';
import { Card as CardComponent } from './ui/card';
import { getAuthToken } from '../utils/local-storage';
import { CardSetFromCardSetAndPacks } from '../interfaces/entity.interface';

export const PacksDisplay: React.FC = () => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);

  const { data: cardSetsAndPacks } = useCardSetsAndPacks();

  // if user with no token arrives on page
  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      setIsAuthorized(false);
      setTimeout(() => {
        router.push('/');
      }, 0);
    }
  }, [router]);

  //  if token is expired
  useEffect(() => {
    if (cardSetsAndPacks?.message === 'Unauthorized') {
      setIsAuthorized(false);
      setTimeout(() => {
        router.push('/');
      }, 0);
    }
  }, [cardSetsAndPacks, router]);

  if (!isAuthorized) return null;

  const handlePackClick = (packId: string) => {
    router.push(`/pack/${packId}`);
  };

  return (
    <CardComponent
      className={`relative w-full h-auto flex gap-4 p-4 overflow-x-auto rounded-tl-3xl row-start-2 row-span-4 overflow-x-auto bg-[linear-gradient(354deg,_rgba(255,255,255,1)_0%,_rgba(255,255,255,1)_45%,_rgba(135,85,196,1)_46%,_rgba(135,85,196,1)_60%,_rgba(252,70,107,1)_90%)] shadow-[inset_5px_5px_10px_rgba(0,0,0,0.5)]`}
    >
      {Array.isArray(cardSetsAndPacks) &&
        cardSetsAndPacks.map((cardSet: CardSetFromCardSetAndPacks) =>
          cardSet.packs.length > 0
            ? cardSet.packs.map((pack) => (
                <div
                  className="relative min-w-[100px]"
                  key={`${cardSet.id}-${pack.id}`}
                >
                  <Image
                    src={pack?.image ?? ''}
                    alt="card pack image"
                    fill
                    className="object-contain cursor-pointer"
                    onClick={() => handlePackClick(`${cardSet.id}-${pack.id}`)}
                    draggable={false}
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ))
            : cardSet.image && (
                <div className="relative min-w-[100px]" key={`${cardSet.id}`}>
                  <Image
                    src={cardSet.image}
                    alt="card pack image"
                    fill
                    className="object-contain cursor-pointer"
                    onClick={() => handlePackClick(`${cardSet.id}-0`)}
                    draggable={false}
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )
        )}
    </CardComponent>
  );
};
