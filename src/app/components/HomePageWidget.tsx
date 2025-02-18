import React from 'react';
import { Card } from './ui/card';

export const HomePageWidget: React.FC<{ text: string }> = (props) => {
  const { text } = props;

  return (
    <Card className="border-black border-5 h-[200px] w-[250px] shadow-[5px_10px_25px_rgba(0,0,0,0.5)] flex justify-center items-center rounded-br-3xl rounded-tl-3xl bg-[linear-gradient(354deg,_rgba(255,255,255,1)_0%,_rgba(255,255,255,1)_45%,_rgba(152,152,152,1)_40%,_rgba(231,231,231,1)_70%,_rgba(255,255,255,1)_80%)]">
      {`${text} not available.`}
    </Card>
  );
};
