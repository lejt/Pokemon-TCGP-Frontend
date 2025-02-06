'use client';

import { useState, useRef } from 'react';
import { Drawer, DrawerContent } from '@/app/components/ui/drawer';
import { LoginForm } from '@/app/components/LoginForm';
import { useRouter } from 'next/navigation';
import { isAuthUser, isExpiredToken } from './utils/auth';

const LandingPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const lastUpdated = useRef(0);
  const router = useRouter();

  const handleClick = () => {
    const isExpired = isExpiredToken();

    if (!isExpired) {
      isAuthUser().then((isAuthenticated) => {
        if (isAuthenticated) {
          router.push('/home');
        }
      });
    } else {
      const now = Date.now();
      // all 1.5 seconds to pass before state update
      if (now - lastUpdated.current >= 2000) {
        setIsOpen((prevState) => !prevState);
        lastUpdated.current = now;
      }
    }
  };

  const handleDrawerClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click inside the drawer from affecting the parent
  };

  return (
    <div
      className="h-screen w-full bg-red-500 flex items-center justify-center"
      onClick={handleClick}
    >
      <h1 className="text-2xl font-bold text-white cursor-pointer">
        {`Welcome to Pokémon TCG Pocket! ${isOpen}`}
      </h1>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent
          className="h-5/6 max-h-full mt-auto"
          onClick={handleDrawerClick}
        >
          <LoginForm />
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default LandingPage;
