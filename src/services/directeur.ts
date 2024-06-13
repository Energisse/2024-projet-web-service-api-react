// // Need to use the React-specific entry point to allow generating React hooks
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import type { Pokemon } from './types'

// // Define a service using a base URL and expected endpoints
// export const pokemonApi = createApi({
//   reducerPath: 'pokemonApi',
//   baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
//   endpoints: (builder) => ({
//     getPokemonByName: builder.query<Pokemon, string>({
//       query: (name) => `pokemon/${name}`,
//     }),
//   }),
// })

// // Export hooks for usage in function components, which are
// // auto-generated based on the defined endpoints
// export const { useGetPokemonByNameQuery } = pokemonApi

export enum Gender {
  "Femme" = 1,
  "Homme",
}

export type directeur = {
  id: number;
  gender: Gender
  name: string;
  birthday: string;
  deathday: string;
  placeOfBirth: string;
  profilePath: string;
  biography: string;
}