'use client';
// LandingPage.tsx
import React, { useState, useCallback } from 'react';
import { useToast } from '@/app/components/ui/hooks/use-toast';
import { LoginForm } from '@/app/components/LoginForm';
import { useRouter } from 'next/navigation';
import { isAuthUser } from './utils/auth';
import { useMutation } from '@tanstack/react-query';
import { CustomDrawer } from './components/CustomDrawer';
import { removeAuthToken } from './utils/local-storage';
import { LoadingPage } from './components/LoadingPage';
import { LandingPageContent } from './components/LandingPageContent';

const LandingPage: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [showLoadingScreen, setShowLoadingScreen] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const authenticateUser = useMutation({
    mutationFn: async () => await isAuthUser(),
    onSuccess: (isAuthenticated) => {
      if (typeof isAuthenticated === 'undefined') {
        toast({
          title: 'Network is busy at the moment',
          description: 'Please wait a few seconds before trying again',
        });
      } else {
        if (isAuthenticated) {
          setShowLoadingScreen(true);
          setTimeout(() => {
            setShowLoadingScreen(false);
            router.push('/home');
          }, 1300);
        } else {
          removeAuthToken();
          setOpenDrawer(true);
        }
      }
    },
  });

  const handleClick = useCallback(() => {
    authenticateUser.mutate();
  }, [authenticateUser]);

  if (authenticateUser.isPending) {
    return <LoadingPage />;
  }

  return (
    <>
      {showLoadingScreen && <LoadingPage />}
      <CustomDrawer
        headerText=""
        drawerTriggerChildren={<LandingPageContent handleClick={handleClick} />}
        drawerContentChildren={<LoginForm />}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      />
    </>
  );
};

export default LandingPage;
