import React from 'react';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import MagnifyGlassIcon from '@/app/assets/images/magnify-glass.svg';
import CardIcon from '@/app/assets/images/cards.svg';
import Image from 'next/image';
import { CardOptionWidget } from './CardOptionWidget';
import BinderIcon from '@/app/assets/images/binder.svg';
import DeckIcon from '@/app/assets/images/deck.svg';
import DisplayBoardIcon from '@/app/assets/images/display-board.svg';

interface CardOptionsProps {
  count: number;
  toggleFetch: boolean;
  setToggleFetch: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CardOptions: React.FC<CardOptionsProps> = (props) => {
  const { count, toggleFetch, setToggleFetch } = props;

  return (
    <Card className="flex flex-col sticky top-[-90px] z-20 w-full min-h-36 border-none p-2 bg-[linear-gradient(354deg,_rgba(255,255,255,1)_0%,_rgba(255,255,255,1)_50%,_rgba(152,152,152,1)_51%,_rgba(209,209,209,1)_60%,_rgba(233,233,233,1)_70%,_rgba(255,255,255,1)_83%)] drop-shadow-xl">
      <div className="flex flex-grow flex-start gap-6 m-4">
        <CardOptionWidget text="Binders" svg={BinderIcon} width={30} />
        <CardOptionWidget
          text="Display Boards"
          svg={DisplayBoardIcon}
          width={40}
        />
        <CardOptionWidget text="Decks" svg={DeckIcon} width={40} />
      </div>

      <Separator className="bg-gray-500 w-full h-[3px] rounded-xl" />

      <div className="flex justify-between px-2 pb-1 pt-3">
        <Card className="flex justify-center px-2">
          <Image
            src={CardIcon}
            alt="card icon"
            style={{ width: '25px', height: '25px' }} // inline styling used instead of props to avoid LCP warnings
          />
          <div className="ml-1">{count ?? 0}</div>
        </Card>

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
            style={{ width: '20px', height: '20px' }}
            className="cursor-not-allowed"
          />
        </div>
      </div>
    </Card>
  );
};
