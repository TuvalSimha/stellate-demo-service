import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'backend/src/schema.ts',
  documents: ['client/graphql/*.ts'],
  generates: {
    './backend/src/__generate__/resolvers-types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
    },
    './client/__generate__/gql/': {
      preset: 'client',
    },
  },
};
export default config;
