import React from 'react';
import PackNotFoundIcon from '../assets/images/card-not-found.svg';
import Image from 'next/image';

export const PackEmpty: React.FC = () => {
  return (
    <div className="min-w-[100px] min-h-[180px] bg-gray-400 rounded-sm shadow-[5px_10px_8px_rgba(0,0,0,0.8)] flex justify-center items-center">
      <Image
        src={PackNotFoundIcon}
        height={20}
        width={20}
        alt="pack not found image"
        style={{ opacity: '20%', height: 'auto' }}
      />
    </div>
  );
};
