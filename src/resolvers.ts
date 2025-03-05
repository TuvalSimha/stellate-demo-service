import { GraphQLError } from 'graphql';
import { Resolvers } from './__generate__/resolvers-types';

// Define interfaces for API responses
interface PokemonApiResponse {
	id: string;
	name: string;
	height: number;
	weight: number;
	sprites: {
		front_default: string;
		front_shiny: string;
		front_female: string;
		front_shiny_female: string;
		back_default: string;
		back_shiny: string;
		back_female: string;
		back_shiny_female: string;
	};
}

interface PokemonListApiResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: Array<{
		name: string;
		url: string;
	}>;
}

export const resolvers: Resolvers = {
	Query: {
		getPokemonById: async (_parent, { id }) => {
			try {
				const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
				if (!response.ok) {
					throw new GraphQLError(`Pokemon with ID ${id} not found`, {
						extensions: { code: 'NOT_FOUND' },
					});
				}

				const data = (await response.json()) as PokemonApiResponse;

				return {
					id: data.id,
					name: data.name,
					height: data.height,
					weight: data.weight,
					sprites: {
						front_default: data.sprites.front_default,
						front_shiny: data.sprites.front_shiny,
						front_female: data.sprites.front_female || '',
						front_shiny_female: data.sprites.front_shiny_female || '',
						back_default: data.sprites.back_default,
						back_shiny: data.sprites.back_shiny,
						back_female: data.sprites.back_female || '',
						back_shiny_female: data.sprites.back_shiny_female || '',
					},
				};
			} catch (error) {
				if (error instanceof GraphQLError) {
					throw error;
				}
				throw new GraphQLError('Failed to fetch Pokemon data', {
					extensions: { code: 'INTERNAL_SERVER_ERROR' },
				});
			}
		},

		allPokemons: async (_parent, { limit = 20, offset = 0 }) => {
			try {
				// Fetch the list of Pokemon
				const listResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
				if (!listResponse.ok) {
					throw new GraphQLError('Failed to fetch Pokemon list', {
						extensions: { code: 'API_ERROR' },
					});
				}

				const listData = (await listResponse.json()) as PokemonListApiResponse;

				// Fetch details for each Pokemon
				const pokemonDetailsPromises = listData.results.map(async (pokemon) => {
					const detailResponse = await fetch(pokemon.url);
					if (!detailResponse.ok) {
						return null;
					}

					const details = (await detailResponse.json()) as PokemonApiResponse;

					return {
						id: details.id,
						name: details.name,
						height: details.height,
						weight: details.weight,
						sprites: {
							front_default: details.sprites.front_default,
							front_shiny: details.sprites.front_shiny,
							front_female: details.sprites.front_female || '',
							front_shiny_female: details.sprites.front_shiny_female || '',
							back_default: details.sprites.back_default,
							back_shiny: details.sprites.back_shiny,
							back_female: details.sprites.back_female || '',
							back_shiny_female: details.sprites.back_shiny_female || '',
						},
					};
				});

				const results = (await Promise.all(pokemonDetailsPromises)).filter(Boolean);

				return {
					results,
					next: listData.next,
					previous: listData.previous,
					total: listData.count, // Use the actual count from the API
				};
			} catch (error) {
				if (error instanceof GraphQLError) {
					throw error;
				}
				throw new GraphQLError('Failed to fetch Pokemon data', {
					extensions: { code: 'INTERNAL_SERVER_ERROR' },
				});
			}
		},
	},
};
