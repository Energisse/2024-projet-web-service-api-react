import { create } from '@mui/material/styles/createTransitions';
import { api } from './api'

const enhancedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMovies: builder.query<Movie[], void>({
      query: () => `movies`,
    }),
    getMovieById: builder.query<Movie, number>({
      query: (id) => `movies/${id}`,
    }),
    getMovieGenres: builder.query<string[], number>({
      query: (id) => `movies/${id}/genres`,
    }),
    getMovieActors: builder.query<string[], number>({
      query: (id) => `movies/${id}/actors`,
    }),
    searchMovies: builder.query<Pick<Movie, "title" | "id">[], string>({
      query: (query) => `movies/search?query=${query}`,
    }),
    createMovie: builder.mutation<Movie, Omit<Movie, "id">>({
      query: (body) => ({
        url: `movies`,
        method: 'POST',
        body,
      }),
    }),
    updateMovie: builder.mutation<Movie, Partial<Movie> & Movie["id"]>({
      query: (body) => ({
        url: `movies`,
        method: 'PUT',
        body,
      }),
    }),
  }),
})

export const { useGetMoviesQuery, useGetMovieByIdQuery, useGetMovieGenresQuery, useGetMovieActorsQuery, useLazySearchMoviesQuery } = enhancedApi

export type Movie = {
  id: number;
  title: string;
  originalTitle: string;
  originalLanguage: string;
  releaseDate: string;
  runtime: number;
  posterPath: string;
  backdropPath: string;
  overview: string;
  budget: number;
  revenue: number;
  directorId: number;
}

