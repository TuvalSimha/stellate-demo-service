'use client';
import { env } from 'process';
import type React from 'react';

import { createClient, Provider } from 'urql';

export const client = createClient({
  url:
    env.NODE_ENV === 'development'
      ? 'https://tuvalsimha.stellate.dev/'
      : 'https://pokemon-demo-website.stellate.sh',
  exchanges: [],
});

export function URQLProvider({ children }: { children: React.ReactNode }) {
  return <Provider value={client}>{children}</Provider>;
}
