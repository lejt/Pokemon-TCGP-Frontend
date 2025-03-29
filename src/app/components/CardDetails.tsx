import React from 'react';
import { UserCard, Ability, Attack } from '../interfaces/entity.interface';
import { UserCardImage } from './UserCardImage';
import { Card as CardComponent } from './ui/card';

export const CardDetails: React.FC<{ userCard: UserCard }> = ({ userCard }) => {
  if (!userCard) return;
  const card = userCard.card;

  const boxShadowInsetStyle = 'shadow-[inset_5px_5px_15px_rgba(0,0,0,0.35)]';
  const titleElementStyle = `text-center rounded-3xl bg-gray-300 ${boxShadowInsetStyle} flex justify-center items-center`;

  const RoundedElement: React.FC<{
    title: string;
    value?: string | number;
  }> = ({ title, value }) => {
    if (!value) return;

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
      <CardComponent className="w-full p-6 shadow-[5px_10px_25px_rgba(0,0,0,0.5)] my-8 bg-gray-200">
        {text}
      </CardComponent>
    );
  };

  return (
    <div className="flex flex-col items-center w-[600px] gap-2 mb-32 mt-12">
      <UserCardImage userCard={userCard} large={true} />
      <div className="flex flex-col items-center mt-6">
        <div className="text-3xl font-bold">{card.name}</div>
        <div>{card.rarity}</div>
      </div>

      {card.category === 'Trainer' && (
        <>
          <DescriptionElement text={card.effect || ''} />
          <RoundedElement title="Trainer" value={card.trainerType || ''} />
        </>
      )}

      {card.category === 'Pokemon' && (
        <>
          {card.description && <DescriptionElement text={card.description} />}

          {card.abilities?.length
            ? card.abilities.map((ability: Ability, idx: number) => (
                <div className="flex flex-col w-full" key={idx}>
                  <div className="flex items-center justify-center">
                    <div className={`${titleElementStyle} py-1 px-20`}>
                      {ability.type}
                    </div>
                    <div className="w-full ml-4 text-xl font-bold">
                      {ability.name}
                    </div>
                  </div>
                  <div className="mt-2">{ability.effect}</div>
                </div>
              ))
            : null}

          <div className={`${titleElementStyle} p-1 w-full mt-6`}>Attacks</div>
          {card.attacks?.length
            ? card.attacks.map((attack: Attack, idx: number) => (
                <div className="flex justify-between w-full mb-6" key={idx}>
                  <div className="flex gap-1">
                    {attack.cost.map((energy: string, idx: number) => (
                      <div key={idx}>{energy}</div>
                    ))}
                  </div>
                  <div>{attack.name}</div>
                  <div>{attack.damage}</div>
                </div>
              ))
            : null}

          <RoundedElement title="Pokemon" value={card.stage} />
          <RoundedElement title="Type" value={card.types[0]} />
          <RoundedElement title="HP" value={card.hp} />
          {card.weakness?.length ? (
            <RoundedElement
              title="Weakness"
              value={`${card.weakness[0].type} ${card.weakness[0].value}`}
            />
          ) : null}
          <RoundedElement title="Retreat" value={card.retreat} />
        </>
      )}

      <RoundedElement title="Illustrator" value={card.illustrator} />
      <div className={`${titleElementStyle} p-4 w-full mt-6`}>
        {card.cardSet.name}
      </div>
    </div>
  );
};
