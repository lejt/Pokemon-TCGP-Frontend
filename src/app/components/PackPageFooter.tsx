import { useRouter } from 'next/navigation';
import React from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer';
import { useCardSetsAndPacks } from '../hooks/cardSets';
import Image from 'next/image';
import BackArrowIcon from '../assets/images/previous-arrow.svg';
import ChevronRight from '../assets/images/chevron-right.svg';

export const PackPageFooter = () => {
  const router = useRouter();

  // TODO: could fetch only if other packs section is clicked for optimization
  const { data: cardSetsAndPacks, isLoading, error } = useCardSetsAndPacks();
  if (!Array.isArray(cardSetsAndPacks)) return;

  return (
    <div className="grid grid-cols-9 place-items-center w-full overflow-x-hidden pt-3 pb-10">
      <div className="col-start-2 col-end-4 cursor-pointer px-4 py-2 flex justify-center items-center rounded-full bg-white shadow-[5px_10px_25px_rgba(0,0,0,0.5)]">
        offering rates
      </div>
      <div
        className="col-start-5 col-end-5 cursor-pointer min-h-20 min-w-20 flex justify-center items-center rounded-full bg-white shadow-[5px_10px_25px_rgba(0,0,0,0.5)]"
        onClick={() => router.push('/home')}
      >
        <Image
          src={BackArrowIcon}
          width={50}
          height={50}
          alt="go previous button"
        />
      </div>
      <Drawer>
        <DrawerTrigger asChild>
          <div className="col-start-7 col-end-10  pl-8 h-16 w-full cursor-pointer flex justify-start items-center rounded-l-full bg-white bg-white shadow-[5px_10px_25px_rgba(0,0,0,0.5)]">
            <div>Select other booster packs</div>
            <Image
              src={ChevronRight}
              width={15}
              height={15}
              alt="right arrow icon"
              className="ml-3 mr-7"
            />
          </div>
        </DrawerTrigger>

        <DrawerContent className="h-3/4 max-h-full">
          <DrawerHeader className="flex flex-col items-center z-10 justify-center w-full bg-white border-b-2 border-gray-300 shadow-[0_10px_10px_-5px_rgba(0,0,0,0.5)]">
            <DrawerTitle>Select Expansion</DrawerTitle>
            <DrawerDescription />
          </DrawerHeader>
          <div className="flex flex-col items-center w-full h-full mx-auto bg-gray-200 pt-8 z-1">
            <div className="flex flex-wrap justify-center items-center gap-12 max-w-[600px]">
              {cardSetsAndPacks.map((cardSet, idx) => {
                return (
                  <div className="flex flex-col items-center" key={idx}>
                    <div className="h-[75px] flex items-center justify-center rounded-full border-2 w-[400px] mb-4 shadow-[5px_10px_15px_rgba(0,0,0,0.5)]">
                      <Image
                        src={`${cardSet.logo}.png`}
                        alt="card expansion logo"
                        height={100}
                        width={120}
                      />
                    </div>
                    {cardSet.packs.length ? (
                      <div className="flex justify-evenly gap-4">
                        {cardSet.packs.map((pack, idx) => (
                          <DrawerClose key={idx}>
                            <div
                              key={idx}
                              className="w-[100px] h-[200px] bg-gray-500 rounded-xl flex items-center justify-center shadow-2xl"
                              onClick={() =>
                                router.push(`/pack/${cardSet.id}-${pack.id}`)
                              }
                            >
                              {pack.id}
                            </div>
                          </DrawerClose>
                        ))}
                      </div>
                    ) : (
                      <DrawerClose>
                        <div
                          className="w-[100px] h-[200px] bg-gray-500 rounded-xl flex items-center shadow-2xl"
                          onClick={() => router.push(`/pack/${cardSet.id}-0`)}
                        >
                          {cardSet.name}
                        </div>
                      </DrawerClose>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
