'use client';

import { HomePageHeader } from '@/app/components/HomePageHeader';
import { HomePageWidget } from '@/app/components/HomePageWidget';
import { PacksDisplay } from '@/app/components/PacksDisplay';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col flex-grow h-full w-full">
      <HomePageHeader />
      <div className="flex flex-col flex-grow w-full p-8 bg-gray-200 justify-center items-center">
        <PacksDisplay />

        <div className="flex gap-4">
          <HomePageWidget text={'Wonder Pick'} />
          <HomePageWidget text={'Shop'} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
