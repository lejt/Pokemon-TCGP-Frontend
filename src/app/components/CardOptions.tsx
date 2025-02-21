import React from 'react';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import MagnifyGlassIcon from '../assets/images/magnify-glass.svg';
import Image from 'next/image';

interface CardOptionsProps {
  count: number;
  toggleFetch: boolean;
  setToggleFetch: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CardOptions: React.FC<CardOptionsProps> = (props) => {
  const { count, toggleFetch, setToggleFetch } = props;

  return (
    <Card className="flex flex-col sticky top-[-60px] z-20 w-full min-h-36 border-none p-2 bg-[linear-gradient(305deg,_rgba(255,255,255,1)_0%,_rgba(255,255,255,1)_70%,_rgba(152,152,152,1)_48%,_rgba(209,209,209,1)_60%,_rgba(233,233,233,1)_70%,_rgba(255,255,255,1)_83%)] drop-shadow-xl">
      <div className="flex flex-grow">Binders, Display Boards, Decks</div>

      <Separator className="bg-gray-500 w-full h-[3px] rounded-xl" />

      <div className="flex justify-between px-2 pb-1 pt-3">
        <Card className="w-8 flex justify-center">{count ?? 0}</Card>
        <div className="flex items-center">
          <Switch
            checked={toggleFetch}
            onCheckedChange={() => setToggleFetch((prev) => !prev)}
          />
          <Separator
            orientation="vertical"
            className="mx-3 bg-gray-200 h-full w-[2px] rounded-xl"
          />
          <Image
            src={MagnifyGlassIcon}
            alt="Search icon"
            width={20}
            height={20}
            className="h-auto"
          />
        </div>
      </div>
    </Card>
  );
};
