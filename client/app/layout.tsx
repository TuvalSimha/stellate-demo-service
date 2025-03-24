import type React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/header';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import { URQLProvider } from '@/lib/urql-client';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PokéDex App',
  description: 'A Pokémon database application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn('font-sans text-text text-base px-10', inter)}
        suppressHydrationWarning
      >
        <URQLProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <div className='min-h-screen flex flex-col'>
              <Header />
              <main className='flex-1 container py-6'>
                {children}
                <Analytics />
              </main>
            </div>
          </ThemeProvider>
        </URQLProvider>
      </body>
    </html>
  );
}
