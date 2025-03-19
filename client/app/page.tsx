import PokemonTableWrapper from './pokemon-table-wrapper';

export default function Home() {
  return (
    <div className='space-y-6 md:px-20 px-4'>
      <h1 className='text-3xl font-bold'>Pokémon Database</h1>
      <p className='text-muted-foreground'>
        Browse through the list of Pokémon. Click on any row to see detailed
        information.
      </p>
      <PokemonTableWrapper />
    </div>
  );
}
