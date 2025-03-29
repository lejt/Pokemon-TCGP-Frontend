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
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </head>
      <body className="bg-center bg-[url(./assets/images/manor-town.webp)] h-full w-full">
        <QueryClientProvider client={queryClient}>
          <div className="h-full flex justify-center">{children}</div>
          <Toaster />
        </QueryClientProvider>
      </body>
    </html>
  );
}
