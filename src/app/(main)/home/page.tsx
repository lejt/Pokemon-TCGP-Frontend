'use client';

import { HomePageHeader } from '@/app/components/HomePageHeader';
import { HomePageWidget } from '@/app/components/HomePageWidget';
import { PacksDisplay } from '@/app/components/PacksDisplay';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-full bg-gray-300">
      <HomePageHeader />
      <div className="flex flex-col w-full px-8 pb-32 justify-center items-center border-x-2 border-black">
        <PacksDisplay />
        <div className="flex gap-12">
          <HomePageWidget text={'Wonder Pick'} />
          <HomePageWidget text={'Shop'} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
