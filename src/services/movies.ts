import { create } from '@mui/material/styles/createTransitions';
import { api } from './api'

const moviesApi = api.injectEndpoints({
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
      query: (id) => `movies/${id}/characters`,
    }),
    searchMovies: builder.query<Pick<Movie, "title" | "id">[], string>({
      query: (query) => `movies/search?query=${query}`,
    }),
    getMoviesByGenre: builder.query<Movie[], string>({
      query: (nom_du_genre) => `movies/genre?query=${nom_du_genre}`,
    }),
  }),
})

export const { useGetMoviesQuery, useGetMovieByIdQuery, useGetMovieGenresQuery, useGetMovieActorsQuery, useLazySearchMoviesQuery, useGetMoviesByGenreQuery } = moviesApi

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

