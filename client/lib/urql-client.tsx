'use client';
import type React from 'react';

import { createClient, Provider } from 'urql';

export const client = createClient({
  url: 'https://pokemon-demo-website.stellate.sh/',
  exchanges: [],
});

export function URQLProvider({ children }: { children: React.ReactNode }) {
  return <Provider value={client}>{children}</Provider>;
}
