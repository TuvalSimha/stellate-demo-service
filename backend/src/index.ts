import { createSchema, createYoga } from 'graphql-yoga';
import { resolvers } from './resolvers';
import { typeDefs } from './schema';
import { createStellateLoggerPlugin } from 'stellate/graphql-yoga';

export interface Env {
	STELLATE_TOKEN: string;
	STELLATE_SERVICE_NAME: string;
}

export default {
	async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
		const stellatePlugin = createStellateLoggerPlugin({
			serviceName: env.STELLATE_SERVICE_NAME,
			token: env.STELLATE_TOKEN,
			fetch: fetch,
		});

		const schema = createSchema<Env>({
			typeDefs: typeDefs,
			resolvers: resolvers,
		});

		const yoga = createYoga<Env>({
			schema,
			plugins: [stellatePlugin],
			graphiql: {
				defaultQuery: /* GraphQL */ `
					query samplePokeAPIquery {
						getPokemonById(id: 1) {
							id
							name
							height
							weight
							sprites {
								front_default
							}
						}
					}
				`,
			},
		});

		return yoga.fetch(request, env);
	},
};
