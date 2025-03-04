'use client';

import './globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/app/components/ui/toaster';

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full">
      <body className="bg-center bg-[url(./assets/images/town_image.png)] bg-auto h-full w-full">
        <QueryClientProvider client={queryClient}>
          <div className="h-full flex justify-center">{children}</div>
          <Toaster />
        </QueryClientProvider>
      </body>
    </html>
  );
}
