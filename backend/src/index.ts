import { createSchema, createYoga } from 'graphql-yoga';
import { resolvers } from './resolvers';
import { typeDefs } from './schema';
import { createStellateLoggerPlugin } from 'stellate/graphql-yoga';

export interface Env {
	STELLATE_TOKEN: string;
	STELLATE_TOKEN_MAIN: string;
	DEV: boolean;
}

export default {
	async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
		const stellatePlugin = createStellateLoggerPlugin({
			serviceName: env.DEV ? 'tuvalsimha' : 'pokemon-demo-website',
			token: env.DEV ? env.STELLATE_TOKEN : env.STELLATE_TOKEN_MAIN,
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
