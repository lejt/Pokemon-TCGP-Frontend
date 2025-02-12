import React from 'react';
import { Avatar, AvatarImage } from './ui/avatar';
import CardsIcon from '../assets/images/cards-blank.svg';
import UpArrowIcon from '../assets/images/arrow-small-up.svg';
import DownArrowIcon from '../assets/images/arrow-small-down.svg';
import Hashtag from '../assets/images/hashtag.svg';
import PokemonType from '../assets/images/pokemon-type.svg';
import PokemonRarity from '../assets/images/pokemon-rarity.svg';
import RecencyIcon from '../assets/images/recency-icon.svg';
import PokemonDuplicate from '../assets/images/pokemon-duplicates.svg';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer';
import { CARDS_SORT_CATEGORY } from '../constants/constants';

interface CardSortBubbleProps {
  className?: string;
  handleSort: (sortName: string) => void;
  sortOrder: { field: string; order: string } | null;
}

export const CardSortBubble: React.FC<CardSortBubbleProps> = ({
  className,
  handleSort,
  sortOrder,
}) => {
  const order = sortOrder?.order;
  let isUpArrow: boolean;

  if (order) {
    isUpArrow = order === 'ASC' ? true : false;
  } else {
    isUpArrow = true;
  }

  const SortOptionComponent = (name: string, svg: StaticImport) => {
    return (
      <div
        className="p-4 w-full flex justify-end border border-indigo-600"
        onClick={() => handleSort(name)}
      >
        <div className="mr-5">{name}</div>
        <Image src={svg} alt="card number sort icon" width={20} height={20} />
      </div>
    );
  };

  return (
    <div className={`${className ?? ''}`}>
      <Drawer>
        <DrawerTrigger asChild>
          <div className="relative w-[72px]">
            <Avatar className="flex justify-center bg-gray-200 w-16 h-16">
              <AvatarImage asChild />
              <Image
                src={CardsIcon}
                alt="card sort icon"
                width={35}
                height={35}
              />
            </Avatar>
            <Image
              src={isUpArrow ? UpArrowIcon : DownArrowIcon}
              alt="card sort icon"
              width={15}
              height={15}
              className="absolute right-0 top-0 bottom-0 my-auto bg-gray-500 rounded-full"
            />
          </div>
        </DrawerTrigger>

        <DrawerContent>
          <div className="mx-auto w-full max-w-[600px] pb-10">
            <DrawerHeader className="flex flex-col items-center justify-center">
              <DrawerTitle>Sort</DrawerTitle>
              <DrawerDescription />
            </DrawerHeader>
            <div className="flex flex-col w-full">
              {SortOptionComponent(
                CARDS_SORT_CATEGORY.CARD_COLLECTION_NUMBER,
                Hashtag
              )}
              {SortOptionComponent(CARDS_SORT_CATEGORY.TYPES, PokemonType)}
              {SortOptionComponent(CARDS_SORT_CATEGORY.RARITY, PokemonRarity)}
              {SortOptionComponent(CARDS_SORT_CATEGORY.RECENCY, RecencyIcon)}
              {SortOptionComponent(
                CARDS_SORT_CATEGORY.DUPLICATES,
                PokemonDuplicate
              )}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
