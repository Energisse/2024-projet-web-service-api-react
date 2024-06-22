import { api } from './api'
import type { Gender } from './directors';
import type { Movie } from './movies';

const actorsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getActors: builder.query<Actor[], void>({
      query: () => '/actors',
    }),
    getActor: builder.query<Actor, number>({
      query: (id) => `/actors/${id}`,
    }),
    getActorMovies: builder.query<Movie[], number>({
      query: (id) => `/actors/${id}/movies`,
    }),
  }),
})

export type Actor = {
  id: number;
  gender: Gender
  name: string;
  birthday: string;
  deathday: string;
  placeOfBirth: string;
  profilePath: string;
  biography: string;
  popularity: number;
}

export const { useGetActorsQuery, useGetActorQuery, useGetActorMoviesQuery } = actorsApi