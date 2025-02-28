'use client';

import { HomePageHeader } from '@/app/components/HomePageHeader';
import { HomePageWidget } from '@/app/components/HomePageWidget';
import { PacksDisplay } from '@/app/components/PacksDisplay';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <HomePageHeader />
      <div className="flex flex-col w-full h-full px-8 pb-32 items-center border-x-2 border-black pt-[40%]">
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
