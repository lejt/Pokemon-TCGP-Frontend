'use client';

import { useState, useRef } from 'react';
import { Drawer, DrawerContent } from '@/app/components/ui/drawer';
import { useToast } from '@/app/components/ui/hooks/use-toast';
import { LoginForm } from '@/app/components/LoginForm';
import { useRouter } from 'next/navigation';
import { isAuthUser } from './utils/auth';
import { useMutation } from '@tanstack/react-query';

const LandingPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const lastUpdated = useRef(0);
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
        } else {
          toggleDrawer();
        }
      }
    },
  });

  const toggleDrawer = () => {
    const now = Date.now();
    if (now - lastUpdated.current >= 2000) {
      setIsOpen((prevState) => !prevState);
      lastUpdated.current = now;
    }
  };

  const handleClick = () => {
    authenticateUser.mutate();
  };

  const handleDrawerClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click inside the drawer from affecting the parent
  };

  if (authenticateUser.isPending) {
    return (
      <div className="h-screen w-full bg-red-500 flex items-center justify-center">
        <span className="text-2xl font-bold text-white">Loading...</span>
      </div>
    );
  }

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
