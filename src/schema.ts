export const typeDefs = /* GraphQL */ `
	type PokemonSprites {
		front_default: String!
		front_shiny: String!
		front_female: String!
		front_shiny_female: String!
		back_default: String!
		back_shiny: String!
		back_female: String!
		back_shiny_female: String!
	}

	type Pokemon {
		id: ID!
		name: String!
		height: Int!
		weight: Int!
		sprites: PokemonSprites!
	}

	type PaginatedPokemon {
		results: [Pokemon]
		next: String
		previous: String
		total: Int!
	}

	type Query {
		getPokemonById(id: ID!): Pokemon
		allPokemons(limit: Int = 20, offset: Int = 0): PaginatedPokemon
	}
`;
