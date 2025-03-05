'use client';

import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
import { useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '../services/api/auth';
import { setAuthToken } from '../utils/local-storage';
import { Separator } from '@radix-ui/react-menubar';
import { useMutation } from '@tanstack/react-query';

interface FormState {
  message?: string;
  accessToken?: string;
}

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const [isLoginForm, setIsLoginForm] = useState<boolean>(true);

  const signUpUser = useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: FormDataEntryValue | null;
      password: FormDataEntryValue | null;
    }) => {
      return await authApi.signUp(username as string, password as string);
    },
  });

  const signInUser = useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: FormDataEntryValue | null;
      password: FormDataEntryValue | null;
    }) => {
      return await authApi.signIn(username as string, password as string);
    },
  });

  const loginAction = async (prevState: FormState, formData: FormData) => {
    // form validation completed in backend
    const username = formData.get('username');
    const password = formData.get('password');

    if (isLoginForm) {
      const response = await signInUser.mutateAsync({ username, password });
      return { message: response?.message, accessToken: response?.accessToken };
    } else {
      const signUpResponse = await signUpUser.mutateAsync({
        username,
        password,
      });

      if (signUpResponse) {
        // auto logs in user after successful sign up
        const signInResponse = await signInUser.mutateAsync({
          username,
          password,
        });
        return {
          message: signInResponse?.message,
          accessToken: signInResponse?.accessToken,
        };
      }
      return {
        message: 'Sign up successful, but login failed. Try logging in again.',
      };
    }
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

  const handleSignUp = () => {
    setIsLoginForm(!isLoginForm);
  };

  const buttonText = () => {
    if (pending) {
      return isLoginForm ? 'Logging in...' : 'Signing up...';
    } else {
      return isLoginForm ? 'Login' : 'Sign Up';
    }
  };

  return (
    <div className="p-4 w-[400px] flex-col justify-items-center mt-6">
      <div className="w-full flex flex-col text-left mb-12 ml-2">
        <div className="text-gray-600 mb-4">
          {isLoginForm ? 'Welcome back!' : 'Start your Pokemon card journey'}
        </div>
        <div className="font-bold text-4xl ">
          {isLoginForm ? 'Login' : 'Sign Up'}
        </div>
      </div>
      <form action={formAction} className="w-full">
        <div className="my-4">
          <Label htmlFor="username" className="font-semibold ml-2">
            Username
          </Label>
          <Input
            id="username"
            name="username"
            placeholder="Enter username"
            required
            autoFocus
            className="border-2 border-gray-400"
          />
        </div>

        <div className="my-4">
          <Label htmlFor="password" className="font-semibold ml-2">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            required
            className="border-2 border-gray-400"
          />
        </div>

        {state?.message && (
          <p className="text-red-500 text-sm">{state.message}</p>
        )}

        <div>
          <Button
            type="submit"
            className={`w-full mt-8 ${
              isLoginForm ? 'bg-red-600' : 'bg-blue-800'
            }`}
            disabled={pending}
          >
            <div className="text-lg">{buttonText()}</div>
          </Button>
          <Separator className="w-full h-[1px] bg-black mt-6 mb-4" />
          <div className="text-gray-600 text-center text-sm">
            {isLoginForm
              ? "Don't have an account?"
              : 'Already have an account?'}
            &nbsp;
            <span
              className="cursor-pointer text-blue-900 text-sm"
              onClick={handleSignUp}
            >
              {isLoginForm ? 'Sign up here.' : 'Log in.'}
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};
