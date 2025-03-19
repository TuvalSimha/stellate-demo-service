'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-16 items-center justify-between'>
        <Link href='/' className='flex items-center space-x-2'>
          <div className='font-bold text-xl'>PokéDex</div>
        </Link>

        <div className='hidden md:flex items-center gap-4'>
          <ThemeToggle />
          <Link href='/about'>About</Link>
        </div>

        <Button
          variant='ghost'
          size='icon'
          className='md:hidden'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className='h-6 w-6' />
          ) : (
            <Menu className='h-6 w-6' />
          )}
        </Button>
      </div>

      {isMenuOpen && (
        <div className='container md:hidden py-4 border-t'>
          <div className='flex flex-col space-y-4'>
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
