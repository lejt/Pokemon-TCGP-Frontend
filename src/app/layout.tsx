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
      <body className="bg-teal-500">
        <QueryClientProvider client={queryClient}>
          <div className="flex justify-center">{children}</div>
          <Toaster />
        </QueryClientProvider>
      </body>
    </html>
  );
}
