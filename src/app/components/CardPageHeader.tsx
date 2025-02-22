import React from 'react';
import { Separator } from './ui/separator';

export const CardPageHeader: React.FC = () => {
  return (
    <div className="w-full h-[100px] bg-slate-100 flex flex-col justify-end items-center sticky top-[-70px] drop-shadow-[0_20px_10px_rgba(0,0,0,0.20)] z-30">
      <div className="text-xl font-bold">My Cards</div>
      <Separator className="h-1 mb-2 mt-4 bg-[linear-gradient(90deg,_rgba(253,29,29,1)_0%,_rgba(252,176,69,1)_30%,_rgba(252,176,69,1)_50%,_rgba(81,215,207,1)_70%,_rgba(91,176,255,1)_90%)]" />
    </div>
  );
};
