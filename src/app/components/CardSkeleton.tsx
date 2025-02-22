import React from 'react';
import { Skeleton } from './ui/skeleton';

interface CardSkeletonProps {
  size?: string;
}

export const CardSkeleton: React.FC<CardSkeletonProps> = (props) => {
  const { size } = props;

  const cardSize =
    size === 'sm' ? 'h-[140px] min-w-[100px]' : 'h-[240px] w-[175px]';

  return <Skeleton className={`${cardSize} rounded-xl`} />;
};
