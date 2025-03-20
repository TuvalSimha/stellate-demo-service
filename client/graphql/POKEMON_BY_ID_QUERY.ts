import { gql } from 'urql';

export const POKEMON_BY_ID_QUERY = gql`
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
