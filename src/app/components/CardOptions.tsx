import React from 'react';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';

interface CardOptionsProps {
  count: number;
}

export const CardOptions: React.FC<CardOptionsProps> = (props) => {
  const { count } = props;
  const cardCountNumber = count ?? 0;

  return (
    <Card className="flex flex-col sticky top-[20px] z-20 min-h-36 h-full bg-orange-500 border-none p-2">
      <div className="flex flex-grow">Binders, Display Boards, Decks</div>
      <div className="flex justify-between">
        <Card className="w-8 flex justify-center">{cardCountNumber}</Card>
        <div className="flex">
          <Switch />
          <Separator orientation="vertical" className="mx-3 bg-black h-auto" />
          <div>Search</div>
        </div>
      </div>
    </Card>
  );
};
