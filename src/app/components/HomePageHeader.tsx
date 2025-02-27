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
    <div className="relative w-full h-[200px] bg-gradient-to-r from-red-700 via-red-500 to-red-700 flex flex-col justify-end items-center sticky top-[-70px] drop-shadow-[0_20px_10px_rgba(0,0,0,0.20)] z-30 border-2 border-black">
      <div className="absolute top-2 left-10 text-gray-900 font-semibold">
        V.1.0
      </div>

      <LightElement color="red" spacingFromRight="125" />
      <LightElement color="yellow" spacingFromRight="75" />
      <LightElement color="green" spacingFromRight="25" />

      <div className="flex justify-center absolute bottom-[-43px]">
        <div className="w-[190px] h-[190px] absolute bottom-[-35px] z-1 rounded-full overflow-x-visible flex items-end justify-center shadow-[5px_10px_25px_rgba(0,0,0,0.1)] bg-gradient-to-r from-red-600 via-red-400 to-red-600 border-2 border-black"></div>
        <div className="w-[50px] h-[50px] absolute bottom-[35px] bg-gray-800 rounded-full z-10"></div>
        <div className="w-[182px] h-[10px] absolute bottom-[55px] bg-gray-800 z-5"></div>
        <div className="w-[30px] h-[30px] absolute bottom-[45px] bg-gray-100 rounded-full z-10"></div>
        <div className="w-[25px] h-[25px] absolute bottom-[48px] rounded-full border-2 border-black z-20"></div>
      </div>
      <div className="z-50 text-gray-900 font-semibold text-md [writing-mode:sideways-lr] absolute top-2 left-2">
        Pokémon TCG Pocket
      </div>

      <Separator className="h-2 mb-3 bg-[linear-gradient(90deg,_rgba(34,193,195,1)_0%,_rgba(105,238,204,1)_30%,_rgba(178,249,150,1)_70%,_rgba(253,187,45,1)_100%)]" />
    </div>
  );
};
