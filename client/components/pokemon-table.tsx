'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useQuery } from 'urql';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ALL_POKEMONS_QUERY = `
  query ($limit: Int!, $offset: Int!) {
    allPokemons(limit: $limit, offset: $offset) {
      total
      previous
      next
      results {
        id
        name
        height
        weight
        sprites {
          front_default
        }
      }
    }
  }
`;

type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
};

export function PokemonTable() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const limit = 10;
  const currentPage = Number(searchParams.get('page')) || 1;
  const offset = (currentPage - 1) * limit;

  const [{ data, fetching, error }] = useQuery({
    query: ALL_POKEMONS_QUERY,
    variables: { limit, offset },
  });

  if (error) {
    return <div className='text-red-500'>Error: {error.message}</div>;
  }

  const pokemons = data?.allPokemons?.results || [];
  const total = data?.allPokemons?.total || 0;
  const totalPages = Math.ceil(total / limit);
  const hasNext = currentPage < totalPages;
  const hasPrevious = currentPage > 1;

  // Update URL params without a full page reload
  const updatePage = (newPage: number) => {
    router.push(`?page=${newPage}`, { scroll: false });
  };

  return (
    <div className='space-y-4'>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[80px]'>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className='hidden md:table-cell'>Height</TableHead>
              <TableHead className='hidden md:table-cell'>Weight</TableHead>
              <TableHead>Sprite</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fetching
              ? Array.from({ length: limit }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className='h-4 w-8' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-4 w-24' />
                    </TableCell>
                    <TableCell className='hidden md:table-cell'>
                      <Skeleton className='h-4 w-12' />
                    </TableCell>
                    <TableCell className='hidden md:table-cell'>
                      <Skeleton className='h-4 w-12' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-12 w-12 rounded-full' />
                    </TableCell>
                  </TableRow>
                ))
              : pokemons.map((pokemon: Pokemon) => (
                  <TableRow
                    key={pokemon.id}
                    className='cursor-pointer hover:bg-muted/50'
                    onClick={() => router.push(`/${pokemon.id}`)}
                  >
                    <TableCell className='font-medium'>{pokemon.id}</TableCell>
                    <TableCell className='capitalize'>{pokemon.name}</TableCell>
                    <TableCell className='hidden md:table-cell'>
                      {pokemon.height / 10} m
                    </TableCell>
                    <TableCell className='hidden md:table-cell'>
                      {pokemon.weight / 10} kg
                    </TableCell>
                    <TableCell>
                      {pokemon.sprites.front_default && (
                        <img
                          src={
                            pokemon.sprites.front_default || '/placeholder.svg'
                          }
                          alt={pokemon.name}
                          className='w-12 h-12'
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>

      <div className='flex items-center justify-between'>
        <div className='text-sm text-muted-foreground'>
          Showing {offset + 1}-{Math.min(offset + limit, total)} of {total}{' '}
          Pokémon
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => updatePage(currentPage - 1)}
            disabled={!hasPrevious || fetching}
          >
            <ChevronLeft className='h-4 w-4 mr-1' />
            Previous
          </Button>
          <div className='text-sm'>
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant='outline'
            size='sm'
            onClick={() => updatePage(currentPage + 1)}
            disabled={!hasNext || fetching}
          >
            Next
            <ChevronRight className='h-4 w-4 ml-1' />
          </Button>
        </div>
      </div>
    </div>
  );
}
