'use client';

import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
import { Card } from '@/app/components/ui/card';
import {
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from '@/app/components/ui/drawer';
import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '../services/api/auth';
import { setAuthToken } from '../utils/local-storage';

interface FormState {
  message?: string;
  accessToken?: string;
}

export const LoginForm: React.FC = () => {
  const router = useRouter();

  const loginAction = async (prevState: FormState, formData: FormData) => {
    // form validation completed in backend
    const username = formData.get('username');
    const password = formData.get('password');

    // service api
    const result = await authApi.signIn(username as string, password as string);
    return { message: result?.message, accessToken: result?.accessToken };
  };

  const [state, formAction, pending] = useActionState(loginAction, {
    message: '',
    accessToken: '',
  });

  useEffect(() => {
    if (state?.accessToken) {
      setAuthToken(state.accessToken);
      router.push('/home');
    }
  }, [router, state]);

  return (
    <div className="p-8 space-y-4 h-screen w-screen w-1/2 flex-col justify-items-center">
      <Card className="px-10 py-8 space-y-4 w-full max-w-[600px] flex-col outline-2">
        <form action={formAction}>
          <DrawerHeader>
            <DrawerTitle>Login</DrawerTitle>
            <DrawerDescription>
              Enter your credentials to continue.
            </DrawerDescription>
          </DrawerHeader>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="Enter username"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              required
            />
          </div>

          {state?.message && (
            <p className="text-red-500 text-sm">{state.message}</p>
          )}

          <DrawerFooter>
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? 'Logging in...' : 'Login'}
            </Button>
          </DrawerFooter>
        </form>
      </Card>
    </div>
  );
};
