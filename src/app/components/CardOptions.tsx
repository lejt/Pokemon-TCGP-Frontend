import React from 'react';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';

interface CardOptionsProps {
  count: number;
  toggleFetch: boolean;
  setToggleFetch: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CardOptions: React.FC<CardOptionsProps> = (props) => {
  const { count, toggleFetch, setToggleFetch } = props;

  return (
    <Card className="flex flex-col sticky top-[-70px] z-20 min-h-36 h-full bg-orange-500 border-none p-2">
      <div className="flex flex-grow">Binders, Display Boards, Decks</div>

      <Separator className="bg-black w-full" />

      <div className="flex justify-between px-2 pb-1 pt-3">
        <Card className="w-8 flex justify-center">{count ?? 0}</Card>
        <div className="flex items-center">
          <Switch
            checked={toggleFetch}
            onCheckedChange={() => setToggleFetch((prev) => !prev)}
          />
          <Separator orientation="vertical" className="mx-3 bg-black h-full" />
          <div>Search</div>
        </div>
      </div>
    </Card>
  );
};
