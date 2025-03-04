'use client';

import { HomePageHeader } from '@/app/components/HomePageHeader';
import { HomePageWidget } from '@/app/components/HomePageWidget';
import { PacksDisplay } from '@/app/components/PacksDisplay';
import { getAuthToken } from '@/app/utils/local-storage';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const HomePage: React.FC = () => {
  const token = getAuthToken();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/');
    }
  }, [router, token]);

  return (
    <div className="flex flex-col w-full h-full bg-gray-300 border-x-2 border-black">
      <HomePageHeader />
      <div className="px-8 pt-8 pb-32 grid grid-rows-9 grid-flow-col h-full">
        <PacksDisplay />
        <div className="flex justify-center gap-12 row-start-7 row-span-2">
          <HomePageWidget text={'Wonder Pick'} />
          <HomePageWidget text={'Shop'} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
