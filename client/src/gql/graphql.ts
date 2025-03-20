/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type PaginatedPokemon = {
  __typename?: 'PaginatedPokemon';
  next?: Maybe<Scalars['String']['output']>;
  previous?: Maybe<Scalars['String']['output']>;
  results?: Maybe<Array<Maybe<Pokemon>>>;
  total: Scalars['Int']['output'];
};

export type Pokemon = {
  __typename?: 'Pokemon';
  height: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  sprites: PokemonSprites;
  weight: Scalars['Int']['output'];
};

export type PokemonSprites = {
  __typename?: 'PokemonSprites';
  back_default: Scalars['String']['output'];
  back_female: Scalars['String']['output'];
  back_shiny: Scalars['String']['output'];
  back_shiny_female: Scalars['String']['output'];
  front_default: Scalars['String']['output'];
  front_female: Scalars['String']['output'];
  front_shiny: Scalars['String']['output'];
  front_shiny_female: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  allPokemons?: Maybe<PaginatedPokemon>;
  getPokemonById?: Maybe<Pokemon>;
};


export type QueryAllPokemonsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetPokemonByIdArgs = {
  id: Scalars['ID']['input'];
};

export type AllPokemonsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type AllPokemonsQuery = { __typename?: 'Query', allPokemons?: { __typename?: 'PaginatedPokemon', total: number, previous?: string | null, next?: string | null, results?: Array<{ __typename?: 'Pokemon', id: string, name: string, height: number, weight: number, sprites: { __typename?: 'PokemonSprites', front_default: string } } | null> | null } | null };

export type GetPokemonByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetPokemonByIdQuery = { __typename?: 'Query', getPokemonById?: { __typename?: 'Pokemon', id: string, name: string, height: number, weight: number, sprites: { __typename?: 'PokemonSprites', front_default: string, front_shiny: string, front_female: string, front_shiny_female: string, back_default: string, back_shiny: string, back_female: string, back_shiny_female: string } } | null };


export const AllPokemonsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"allPokemons"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allPokemons"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"previous"}},{"kind":"Field","name":{"kind":"Name","value":"next"}},{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"sprites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"front_default"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AllPokemonsQuery, AllPokemonsQueryVariables>;
export const GetPokemonByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPokemonById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPokemonById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"sprites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"front_default"}},{"kind":"Field","name":{"kind":"Name","value":"front_shiny"}},{"kind":"Field","name":{"kind":"Name","value":"front_female"}},{"kind":"Field","name":{"kind":"Name","value":"front_shiny_female"}},{"kind":"Field","name":{"kind":"Name","value":"back_default"}},{"kind":"Field","name":{"kind":"Name","value":"back_shiny"}},{"kind":"Field","name":{"kind":"Name","value":"back_female"}},{"kind":"Field","name":{"kind":"Name","value":"back_shiny_female"}}]}}]}}]}}]} as unknown as DocumentNode<GetPokemonByIdQuery, GetPokemonByIdQueryVariables>;