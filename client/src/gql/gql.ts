/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query allPokemons($limit: Int!, $offset: Int!) {\n    allPokemons(limit: $limit, offset: $offset) {\n      total\n      previous\n      next\n      results {\n        id\n        name\n        height\n        weight\n        sprites {\n          front_default\n        }\n      }\n    }\n  }\n": typeof types.AllPokemonsDocument,
    "\n  query getPokemonById($id: ID!) {\n    getPokemonById(id: $id) {\n      id\n      name\n      height\n      weight\n      sprites {\n        front_default\n        front_shiny\n        front_female\n        front_shiny_female\n        back_default\n        back_shiny\n        back_female\n        back_shiny_female\n      }\n    }\n  }\n": typeof types.GetPokemonByIdDocument,
};
const documents: Documents = {
    "\n  query allPokemons($limit: Int!, $offset: Int!) {\n    allPokemons(limit: $limit, offset: $offset) {\n      total\n      previous\n      next\n      results {\n        id\n        name\n        height\n        weight\n        sprites {\n          front_default\n        }\n      }\n    }\n  }\n": types.AllPokemonsDocument,
    "\n  query getPokemonById($id: ID!) {\n    getPokemonById(id: $id) {\n      id\n      name\n      height\n      weight\n      sprites {\n        front_default\n        front_shiny\n        front_female\n        front_shiny_female\n        back_default\n        back_shiny\n        back_female\n        back_shiny_female\n      }\n    }\n  }\n": types.GetPokemonByIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query allPokemons($limit: Int!, $offset: Int!) {\n    allPokemons(limit: $limit, offset: $offset) {\n      total\n      previous\n      next\n      results {\n        id\n        name\n        height\n        weight\n        sprites {\n          front_default\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query allPokemons($limit: Int!, $offset: Int!) {\n    allPokemons(limit: $limit, offset: $offset) {\n      total\n      previous\n      next\n      results {\n        id\n        name\n        height\n        weight\n        sprites {\n          front_default\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPokemonById($id: ID!) {\n    getPokemonById(id: $id) {\n      id\n      name\n      height\n      weight\n      sprites {\n        front_default\n        front_shiny\n        front_female\n        front_shiny_female\n        back_default\n        back_shiny\n        back_female\n        back_shiny_female\n      }\n    }\n  }\n"): (typeof documents)["\n  query getPokemonById($id: ID!) {\n    getPokemonById(id: $id) {\n      id\n      name\n      height\n      weight\n      sprites {\n        front_default\n        front_shiny\n        front_female\n        front_shiny_female\n        back_default\n        back_shiny\n        back_female\n        back_shiny_female\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;