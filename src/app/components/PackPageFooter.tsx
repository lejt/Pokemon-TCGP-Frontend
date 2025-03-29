import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { DrawerClose } from './ui/drawer';
import Image from 'next/image';
import BackArrowIcon from '../assets/images/previous-arrow.svg';
import ChevronRight from '../assets/images/chevron-right.svg';
import { CustomDrawer } from './CustomDrawer';
import { getAuthToken } from '../utils/local-storage';
import {
  CardSetFromCardSetAndPacks,
  Pack,
} from '../interfaces/entity.interface';
import { PackEmpty } from './PackEmpty';

export const PackPageFooter: React.FC<{
  cardSetsAndPacks: CardSetFromCardSetAndPacks[];
}> = ({ cardSetsAndPacks }) => {
  const router = useRouter();
  const token = getAuthToken();

  useEffect(() => {
    if (!token) {
      router.push('/');
    }
  }, [router, token]);

  if (!Array.isArray(cardSetsAndPacks)) return;

  const OpenOtherPacks: React.FC = () => {
    return (
      <div className="flex pl-8 h-16 justify-start items-center ">
        <div className="text-sm h-full">Select other booster packs</div>
        <Image
          src={ChevronRight}
          alt="right arrow icon"
          className="ml-3 mr-7"
          style={{ width: '15px', height: '25px' }}
        />
      </div>
    );
  };

  const PackChoices: React.FC = () => {
    return (
      <div className="flex flex-col items-center w-full h-full bg-gray-200 pt-8 pb-12 z-1 overflow-y-auto">
        <div className="flex flex-wrap justify-center items-center gap-12 max-w-[600px]">
          {cardSetsAndPacks.map((cardSet, idx) => {
            return (
              <div className="flex flex-col items-center" key={idx}>
                <div className="h-[75px] flex items-center justify-center rounded-full border-2 w-[400px] mb-4 shadow-[5px_10px_15px_rgba(0,0,0,0.5)]">
                  <Image
                    src={`${cardSet.logo}.png`}
                    alt="card expansion logo"
                    width={120}
                    height={30}
                    style={{ width: '100px', height: 'auto' }}
                  />
                </div>
                {cardSet.packs.length ? (
                  <div className="flex justify-evenly gap-4">
                    {cardSet.packs.map((pack: Pack, idx: number) => (
                      <DrawerClose key={idx}>
                        <div
                          key={idx}
                          className="flex items-center justify-center rounded-xl"
                          onClick={() =>
                            router.push(`/pack/${cardSet.id}-${pack.id}`)
                          }
                        >
                          {pack.image ? (
                            <Image
                              src={pack.image}
                              alt="card pack image"
                              width={100}
                              height={200}
                              style={{ width: '100%', height: 'auto' }}
                              className="shadow-[5px_10px_8px_rgba(0,0,0,0.8)] rounded-sm"
                            />
                          ) : (
                            <PackEmpty />
                          )}
                        </div>
                      </DrawerClose>
                    ))}
                  </div>
                ) : (
                  <DrawerClose>
                    <div
                      className="flex items-center shadow-2xl"
                      onClick={() => router.push(`/pack/${cardSet.id}-0`)}
                    >
                      {cardSet.image ? (
                        <Image
                          src={cardSet.image}
                          alt="card pack image"
                          width={100}
                          height={200}
                          style={{ width: '100%', height: 'auto' }}
                          className="shadow-[5px_10px_8px_rgba(0,0,0,0.8)] rounded-sm"
                        />
                      ) : (
                        <PackEmpty />
                      )}
                    </div>
                  </DrawerClose>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-9 place-items-center w-full pb-8 overflow-x-hidden">
      <div className="text-sm col-start-2 col-end-4 cursor-not-allowed px-5 py-3 flex justify-center items-center rounded-full bg-white shadow-[5px_10px_25px_rgba(0,0,0,0.5)] overflow-hidden text-wrap">
        Offering rates
      </div>

      <div
        className="col-start-5 col-end-5 cursor-pointer min-h-20 min-w-20 flex justify-center items-center rounded-full bg-white shadow-[5px_10px_25px_rgba(0,0,0,0.5)]"
        onClick={() => router.push('/home')}
      >
        <Image
          src={BackArrowIcon}
          width={40}
          height={40}
          alt="go previous button"
          style={{ width: '40px', height: '40px' }}
        />
      </div>

      <div className="col-start-7 col-end-10 w-full cursor-pointer rounded-l-full bg-white shadow-[5px_10px_25px_rgba(0,0,0,0.5)] overflow-hidden">
        <CustomDrawer
          headerText="Select Expansion"
          drawerTriggerChildren={<OpenOtherPacks />}
          drawerContentChildren={<PackChoices />}
        />
      </div>
    </div>
  );
};
