import React from 'react';
import { UserCard } from '../interfaces/entity.interface';
import { UserCardImage } from './UserCardImage';
import { Card } from './ui/card';

export const CardDetails: React.FC<{ userCard: UserCard }> = ({ userCard }) => {
  if (!userCard) return;
  console.log(userCard.card);

  const card = userCard.card;

  const boxShadowInsetStyle = 'shadow-[inset_5px_5px_15px_rgba(0,0,0,0.35)]';
  const titleElementStyle = `text-center w-full rounded-3xl bg-gray-300 mt-6 ${boxShadowInsetStyle}`;

  const RoundedElement: React.FC<{ title: string; value: string }> = ({
    title,
    value,
  }) => {
    return (
      <div className={`flex rounded-full w-full p-2 ${boxShadowInsetStyle}`}>
        <div className="bg-gray-300 text-center w-32 rounded-l-full">
          {title}
        </div>
        <div className="ml-6">{value}</div>
      </div>
    );
  };

  const DescriptionElement: React.FC<{ text: string }> = ({ text }) => {
    return (
      <Card className="w-full p-6 shadow-[5px_10px_25px_rgba(0,0,0,0.5)] my-8 bg-gray-200">
        {text}
      </Card>
    );
  };

  return (
    <div className="flex flex-col items-center w-[600px] gap-2 mb-32">
      <UserCardImage userCard={userCard} large={true} />
      <div className="flex flex-col items-center mt-6">
        <div className="text-3xl font-bold">{card.name}</div>
        <div>{card.rarity}</div>
      </div>

      {card.category === 'Trainer' && (
        <>
          <DescriptionElement text={card.effect} />
          <RoundedElement title="Trainer" value={card.trainerType} />
        </>
      )}

      {card.category === 'Pokemon' && (
        <>
          <DescriptionElement text={card.description} />

          <div className={`${titleElementStyle} p-1`}>Attacks</div>
          {card.attacks.map(
            (
              attack: { cost: string[]; name: string; damage: number },
              idx: number
            ) => (
              <div className="flex justify-between w-full mb-6" key={idx}>
                <div className="flex gap-1">
                  {attack.cost.map((energy: string, idx: number) => (
                    <div key={idx}>{energy}</div>
                  ))}
                </div>
                <div>{attack.name}</div>
                <div>{attack.damage}</div>
              </div>
            )
          )}

          <RoundedElement title="Pokemon" value={card.stage} />
          <RoundedElement title="Type" value={card.types[0]} />
          <RoundedElement title="HP" value={card.hp} />
          <RoundedElement
            title="Weakness"
            value={`${card.weakness[0].type} ${card.weakness[0].value}`}
          />
          <RoundedElement title="Retreat" value={card.retreat} />
        </>
      )}

      <RoundedElement title="Illustrator" value={card.illustrator} />
      <div className={`${titleElementStyle} p-4`}>{card.cardSet.name}</div>
    </div>
  );
};
