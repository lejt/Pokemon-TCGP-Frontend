import React from 'react';
import { Separator } from './ui/separator';
import { CardSkeleton } from './CardSkeleton';
import { Skeleton } from './ui/skeleton';

export const CardComparisonSkeletons: React.FC = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <Skeleton className="h-[50px] w-[100px] rounded-xl" />
        <div className="flex justify-center mt-4">
          <Skeleton className="h-[25px] w-[50px] rounded-xl px-2 mr-4" />
          <Skeleton className="h-[25px] w-[50px] rounded-xl px-2" />
        </div>
      </div>
      <Separator className="bg-black mt-3 h-1 mb-8" />

      <div className="grid grid-cols-3 gap-3 place-items-center mb-16">
        {[...Array(12)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </>
  );
};
