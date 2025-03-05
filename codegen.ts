import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	schema: 'src/schema.ts',
	generates: {
		'./src/__generate__/resolvers-types.ts': {
			plugins: ['typescript', 'typescript-resolvers'],
		},
	},
};
export default config;
