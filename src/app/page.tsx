'use client';

import { useToast } from '@/app/components/ui/hooks/use-toast';
import { LoginForm } from '@/app/components/LoginForm';
import { useRouter } from 'next/navigation';
import { isAuthUser } from './utils/auth';
import { useMutation } from '@tanstack/react-query';
import { CustomDrawer } from './components/CustomDrawer';
import BackgroundImage from '@/app/assets/images/town_image.png';
import VenasaurCard from '@/app/assets/images/venasaur-ex-card.png';
import BlastoiseCard from '@/app/assets/images/blastoise-ex-card.png';
import CharizardCard from '@/app/assets/images/charizard-ex-card.png';
import PikachuCard from '@/app/assets/images/pikachu-card.png';
import EeveeCard from '@/app/assets/images/eevee-card.png';
import Image, { StaticImageData } from 'next/image';
import { LoadingSpinner } from './components/LoadingSpinner';

const LandingPage: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();

  const authenticateUser = useMutation({
    mutationFn: async () => {
      return await isAuthUser();
    },
    onSuccess: (isAuthenticated) => {
      if (typeof isAuthenticated == 'undefined') {
        toast({
          title: 'Network is busy at the moment',
          description: 'Please wait a few seconds before trying again',
        });
      } else {
        if (isAuthenticated) {
          router.push('/home');
        }
      }
    },
  });

  const handleClick = () => {
    authenticateUser.mutate();
  };

  const CardElement: React.FC<{
    png: StaticImageData;
    style: string;
    cardWidth: number;
  }> = ({ png, style, cardWidth }) => {
    return (
      <div className={`absolute flex flex-col z-10 ${style}`}>
        <Image
          src={png}
          alt="start screen card"
          className={`z-20  animate-pulse`}
          style={{ height: 'auto', width: cardWidth }}
        />
        <Image
          src={png}
          alt="start screen venasaur card reflection"
          className={`w-[${cardWidth}px] opacity-30 scale-y-[-1]`}
          style={{ height: 'auto', width: cardWidth }}
        />
      </div>
    );
  };

  if (authenticateUser.isPending) {
    return (
      <div className="h-screen w-screen bg-white flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const PageContent: React.FC = () => {
    return (
      <div
        className="relative w-screen h-screen flex items-center justify-center overflow-x-auto"
        onClick={handleClick}
      >
        <div className="min-w-[2000px] h-full flex justify-center">
          <Image
            src={BackgroundImage}
            alt="start screen image"
            className="w-[3840px] h-auto"
            style={{ display: 'block' }}
          />

          <CardElement
            png={VenasaurCard}
            cardWidth={200}
            style={'left-3/4 top-1/2'}
          />
          <CardElement
            png={BlastoiseCard}
            cardWidth={200}
            style={'right-3/4 top-1/2'}
          />
          <CardElement png={CharizardCard} cardWidth={200} style={'top-20'} />
          <CardElement
            png={EeveeCard}
            cardWidth={130}
            style={'top-40  left-3/4'}
          />
          <CardElement
            png={PikachuCard}
            cardWidth={130}
            style={'top-40  right-3/4'}
          />

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black font-bold text-8xl w-[500px] text-gray-800 z-20">
            Pokémon TCG Pocket
          </div>
          <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black font-bold text-xl animate-pulse">
            Click to continue
          </div>
        </div>
      </div>
    );
  };

  return (
    <CustomDrawer
      headerText=""
      drawerTriggerChildren={<PageContent />}
      drawerContentChildren={<LoginForm />}
    />
  );
};

export default LandingPage;
