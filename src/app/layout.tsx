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
    <html>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
      </head>
      <body className="bg-center bg-[url(./assets/images/town_image.png)] bg-cover h-screen">
        <QueryClientProvider client={queryClient}>
          <div className="flex justify-center h-full">{children}</div>
          <Toaster />
        </QueryClientProvider>
      </body>
    </html>
  );
}
