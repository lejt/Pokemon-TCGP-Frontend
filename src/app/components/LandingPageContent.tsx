import React from 'react';
import { CardAndReflection } from './CardAndReflection';
import VenasaurCard from '@/app/assets/images/venasaur-ex-card.png';
import BlastoiseCard from '@/app/assets/images/blastoise-ex-card.png';
import CharizardCard from '@/app/assets/images/charizard-ex-card.png';
import PikachuCard from '@/app/assets/images/pikachu-card.png';
import EeveeCard from '@/app/assets/images/eevee-card.png';

export const LandingPageContent: React.FC<{ handleClick: () => void }> = ({
  handleClick,
}) => {
  return (
    <div
      className="relative flex flex-col items-center justify-center w-screen h-screen overflow-hidden"
      onClick={handleClick}
    >
      <div className="bg-[linear-gradient(354deg,_rgba(255,255,255,1)_0%,_rgba(255,255,255,1)_50%,_rgba(152,152,152,1)_51%,_rgba(209,209,209,1)_60%,_rgba(233,233,233,1)_70%,_rgba(255,255,255,1)_83%)] opacity-80 w-full h-full absolute"></div>
      <CardAndReflection
        png={VenasaurCard}
        cardWidth={200}
        style={'left-3/4 top-1/2'}
      />
      <CardAndReflection
        png={BlastoiseCard}
        cardWidth={200}
        style={'right-3/4 top-1/2'}
      />
      <CardAndReflection png={CharizardCard} cardWidth={200} style={'top-20'} />
      <CardAndReflection
        png={EeveeCard}
        cardWidth={130}
        style={'top-20  left-3/4'}
      />
      <CardAndReflection
        png={PikachuCard}
        cardWidth={130}
        style={'top-20  right-3/4'}
      />
      <div className="z-20 text-zinc-800 font-extrabold text-6xl w-[500px] text-gray-800 z-10 animate__animated animate__jackInTheBox shadow-glow border-black border-2 bg-white">
        Pokémon TCG Pocket
      </div>
      <div className="absolute bottom-20 z-20 text-gray-700 font-bold text-xl animate-pulse hover:text-gray-400 cursor-pointer">
        Click anywhere to continue
      </div>
    </div>
  );
};
