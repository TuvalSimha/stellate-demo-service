'use client';

import { useQuery } from 'urql';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image'; // Use next/image for optimized images
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';

const POKEMON_BY_ID_QUERY = `
  query getPokemonById($id: ID!) {
    getPokemonById(id: $id) {
      id
      name
      height
      weight
      sprites {
        front_default
        front_shiny
        front_female
        front_shiny_female
        back_default
        back_shiny
        back_female
        back_shiny_female
      }
    }
  }
`;

export default function PokemonDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const nextPokemonId = parseInt(id, 10) + 1;
  const previousPokemonId = parseInt(id, 10) - 1;

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't run the query until the component is mounted
  const [{ data, fetching, error }] = useQuery({
    query: POKEMON_BY_ID_QUERY,
    variables: { id },
    pause: !isMounted,
  });

  if (!isMounted || fetching) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className='flex flex-row justify-center w-full '>
        <ErrorCard error={error} />
      </div>
    );
  }

  const pokemon = data?.getPokemonById;

  if (!pokemon) {
    return <div>Pokémon not found</div>;
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-4'>
        <Button variant='outline' size='icon' onClick={() => router.push('/')}>
          <ArrowLeft className='h-4 w-4' />
        </Button>
        <h1 className='text-3xl font-bold capitalize'>{pokemon.name}</h1>
        <div className='ml-auto text-2xl font-semibold'>#{pokemon.id}</div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <div className='text-sm text-muted-foreground'>Height</div>
                <div className='font-medium'>{pokemon.height / 10} m</div>
              </div>
              <div>
                <div className='text-sm text-muted-foreground'>Weight</div>
                <div className='font-medium'>{pokemon.weight / 10} kg</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sprites</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              {renderSprite(pokemon.sprites.front_default, 'Front Default')}
              {renderSprite(pokemon.sprites.back_default, 'Back Default')}
              {renderSprite(pokemon.sprites.front_shiny, 'Front Shiny')}
              {renderSprite(pokemon.sprites.back_shiny, 'Back Shiny')}
              {renderSprite(pokemon.sprites.front_female, 'Front Female')}
              {renderSprite(pokemon.sprites.back_female, 'Back Female')}
              {renderSprite(
                pokemon.sprites.front_shiny_female,
                'Front Shiny Female'
              )}
              {renderSprite(
                pokemon.sprites.back_shiny_female,
                'Back Shiny Female'
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className='flex flex-row justify-between w-full'>
        <PreviousPokemonButton id={previousPokemonId} />
        <NextPokemonButton id={nextPokemonId} />
      </div>
    </div>
  );
}

function renderSprite(url: string | null, label: string) {
  if (!url) return null;

  return (
    <div className='flex flex-col items-center'>
      <Image src={url} alt={label} width={80} height={80} />
      <div className='text-xs text-center mt-1'>{label}</div>
    </div>
  );
}

function redirectToNextPokemon(
  id: number,
  router: ReturnType<typeof useRouter>
) {
  router.push(`/${id}`);
}

function NextPokemonButton({ id }: { id: number }) {
  const router = useRouter();
  return (
    <Button
      disabled={id === 1302}
      variant='default'
      onClick={() => redirectToNextPokemon(id, router)}
    >
      Next Pokémon
    </Button>
  );
}

function PreviousPokemonButton({ id }: { id: number }) {
  const router = useRouter();
  return (
    <Button
      disabled={id === 0}
      variant='default'
      onClick={() => redirectToNextPokemon(id, router)}
    >
      Previous Pokémon
    </Button>
  );
}

function LoadingSkeleton() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-4'>
        <Skeleton className='h-10 w-10' />
        <Skeleton className='h-8 w-40' />
        <div className='ml-auto'>
          <Skeleton className='h-8 w-16' />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Card>
          <CardHeader>
            <Skeleton className='h-6 w-40' />
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Skeleton className='h-4 w-16' />
                <Skeleton className='h-6 w-20 mt-1' />
              </div>
              <div>
                <Skeleton className='h-4 w-16' />
                <Skeleton className='h-6 w-20 mt-1' />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className='h-6 w-40' />
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className='flex flex-col items-center'>
                  <Skeleton className='h-20 w-20' />
                  <Skeleton className='h-4 w-16 mt-1' />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ErrorCard({ error }: { error: { message: string } }) {
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Error</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='text-red-500'>{error.message}</div>
      </CardContent>
      <Button
        className='mx-10 cursor-pointer'
        variant='default'
        onClick={() => router.push('/')}
      >
        Come back to the home page
      </Button>
    </Card>
  );
}
