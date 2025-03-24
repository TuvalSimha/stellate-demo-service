'use client';

import { cacheExchange, createClient, fetchExchange, Provider } from 'urql';
import React from 'react';

const client = createClient({
  url: 'https://pokemon-demo-website.stellate.sh/',
  exchanges: [cacheExchange, fetchExchange],
});

export function URQLProvider({ children }: { children: React.ReactNode }) {
  return <Provider value={client}>{children}</Provider>;
}
