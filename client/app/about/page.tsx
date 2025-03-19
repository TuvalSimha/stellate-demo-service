export default function About() {
  return (
    <div className='space-y-6 md:px-20 px-4'>
      <h1 className='text-3xl font-bold'>About</h1>
      <p className='text-muted-foreground'>
        Welcome to the <strong>Pokédex Demo</strong>, a showcase application
        demonstrating the power of <strong>GraphQL caching</strong> with{' '}
        <strong>
          <a href='https://stellate.co/'>Stellate</a>
        </strong>
        .
      </p>
      <p className='text-muted-foreground'>
        This app is built with <strong>Next.js</strong> and{' '}
        <strong>GraphQL</strong>, fetching real-time Pokémon data through a
        custom GraphQL API:{' '}
        <a
          href='https://stellate-graphql-demo-service.tuval-simha-1cf.workers.dev/graphql'
          target='_blank'
          rel='noopener noreferrer'
          className='text-primary'
        >
          Stellate GraphQL Demo Service
        </a>
        .
      </p>
      <p className='text-muted-foreground'>
        The application also uses the{' '}
        <a
          href='https://pokeapi.co/'
          target='_blank'
          rel='noopener noreferrer'
          className='text-primary'
        >
          Pokémon API
        </a>{' '}
        to fetch additional data about Pokémon.
      </p>
      <p className='text-muted-foreground'>
        The application is built with the following technologies:
      </p>
      <ul className='list-disc pl-6 text-muted-foreground'>
        <li>Next.js – Server-side rendering & client-side navigation</li>
        <li>GraphQL – Efficient data fetching with strong typing</li>
        <li>React – Component-based UI development</li>
        <li>Tailwind CSS – Responsive and customizable styling</li>
        <li>Stellate – Optimized caching for GraphQL APIs</li>
      </ul>
      <p className='text-muted-foreground'>
        Explore the app and experience the power of{' '}
        <strong>GraphQL caching</strong>!
      </p>
    </div>
  );
}
