import React from 'react';
import SpinnerGIF from '@/app/assets/images/blue-loading.gif';
import Image from 'next/image';

export const LoadingSpinner: React.FC = () => {
  return (
    <Image
      src={SpinnerGIF}
      width={70}
      height={70}
      alt="loading gif"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-auto max-w-[70px]"
    />
  );
};
