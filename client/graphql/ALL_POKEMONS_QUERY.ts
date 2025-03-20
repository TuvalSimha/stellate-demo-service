import { gql } from 'urql';

export const ALL_POKEMONS_QUERY = gql`
  query allPokemons($limit: Int!, $offset: Int!) {
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
