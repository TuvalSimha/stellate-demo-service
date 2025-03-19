'use client';

import type { ReactNode } from 'react';
import { Client, Provider, cacheExchange, fetchExchange } from 'urql';

// Create a client
const client = new Client({
  url: 'https://stellate-graphql-demo-service.tuval-simha-1cf.workers.dev/graphql',
  exchanges: [cacheExchange, fetchExchange],
});

export function URQLProvider({ children }: { children: ReactNode }) {
  return <Provider value={client}>{children}</Provider>;
}
