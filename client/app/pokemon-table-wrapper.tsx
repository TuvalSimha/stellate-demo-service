'use client';

import dynamic from 'next/dynamic';

// Import the PokemonTable component with no SSR
const PokemonTable = dynamic(
  () => import('@/components/pokemon-table').then((mod) => mod.PokemonTable),
  { ssr: false }
);

export default function PokemonTableWrapper() {
  return <PokemonTable />;
}
