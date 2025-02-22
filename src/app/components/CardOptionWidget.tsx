import React from 'react';
import Image from 'next/image';

export const CardOptionWidget: React.FC<{
  text: string;
  svg: string;
  width: number;
}> = ({ text, svg, width }) => {
  return (
    <div className="relative h-[80px] w-[70px] shadow-[5px_10px_25px_rgba(0,0,0,0.5)] bg-white flex flex-col justify-evenly items-center rounded-br-3xl rounded-tl-3xl rounded-bl-md rounded-tr-md text-center cursor-pointer">
      <Image
        src={svg}
        alt="Card option icon"
        style={{ width: `${width}px`, height: '30px' }}
      />
      <div className="text-xs">{text}</div>
    </div>
  );
};
