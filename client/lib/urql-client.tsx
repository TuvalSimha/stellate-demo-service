'use client';

import type React from 'react';

import { cacheExchange, createClient, fetchExchange, Provider } from 'urql';

export const client = createClient({
  url: 'https://stellate-graphql-demo-service.tuval-simha-1cf.workers.dev/graphql',
  exchanges: [cacheExchange, fetchExchange],
});

export function URQLProvider({ children }: { children: React.ReactNode }) {
  return <Provider value={client}>{children}</Provider>;
}
