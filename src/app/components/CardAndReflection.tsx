import React from 'react';
import Image, { StaticImageData } from 'next/image';

export const CardAndReflection: React.FC<{
  png: StaticImageData;
  style: string;
  cardWidth: number;
}> = ({ png, style, cardWidth }) => {
  return (
    <div className={`absolute flex flex-col z-10 ${style} animate-pulse`}>
      <Image
        src={png}
        alt="start screen card"
        className={`z-20 animate__animated animate__zoomIn shadow-[5px_10px_25px_rgba(0,0,0,0.5)] rounded-md`}
        style={{ height: 'auto', width: cardWidth }}
        priority
      />
      <Image
        src={png}
        alt="start screen card reflection"
        className="w-[${cardWidth}px] scale-y-[-1] opacity-50 animate__animated animate__zoomIn"
        style={{ height: 'auto', width: cardWidth }}
        priority
      />
    </div>
  );
};
