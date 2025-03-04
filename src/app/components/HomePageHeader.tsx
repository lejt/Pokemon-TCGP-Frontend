import React from 'react';
import { Separator } from './ui/separator';

export const HomePageHeader: React.FC = () => {
  const LightElement: React.FC<{ color: string; spacingFromRight: string }> = ({
    color,
    spacingFromRight,
  }) => {
    return (
      <div
        className="absolute top-3 w-[30px] h-[30px] rounded-full shadow-[inset_5px_5px_10px_rgba(0,0,0,0.5)] border-2 border-gray-800"
        style={{
          right: `${spacingFromRight}px`,
          backgroundColor: `${color}`,
        }}
      ></div>
    );
  };

  return (
    <div className="relative w-full min-h-[150px] bg-gradient-to-r from-red-700 via-red-500 to-red-700 flex flex-col justify-end items-center sticky top-[-70px] drop-shadow-[0_20px_10px_rgba(0,0,0,0.20)] z-30 border-t-2 border-black">
      <div className="absolute top-4 left-12 text-gray-400 font-semibold px-4 rounded-full border-2 border-black bg-gray-700 text-sm">
        V.1.0
      </div>

      <LightElement color="red" spacingFromRight="125" />
      <LightElement color="yellow" spacingFromRight="75" />
      <LightElement color="green" spacingFromRight="25" />

      <div className="flex justify-center absolute bottom-[-37px]">
        <div className="w-[150px] h-[150px] absolute bottom-[-20px] z-1 rounded-full overflow-x-visible flex items-end justify-center shadow-[5px_10px_25px_rgba(0,0,0,0.1)] bg-gradient-to-r from-red-600 via-red-400 to-red-600 border-2 border-black"></div>
        <div className="w-[30px] h-[30px] absolute bottom-[38px] bg-gray-800 rounded-full z-10"></div>
        <div className="w-[20px] h-[20px] absolute bottom-[43px] bg-gray-100 rounded-full z-10"></div>
        <div className="w-[14px] h-[14px] absolute bottom-[46px] rounded-full border-2 border-black z-20"></div>
      </div>
      <div className="z-50 text-gray-900 font-semibold text-md [writing-mode:sideways-lr] absolute top-0 left-2 h-auto text-start pb-7">
        Pokémon TCG Pocket
      </div>

      <Separator className="h-2 mb-3 bg-[linear-gradient(90deg,_rgba(34,193,195,1)_0%,_rgba(105,238,204,1)_30%,_rgba(178,249,150,1)_70%,_rgba(253,187,45,1)_100%)] animate-pulse border-y-2 border-black" />
    </div>
  );
};
