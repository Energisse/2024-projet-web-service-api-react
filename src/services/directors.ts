import { get } from "react-hook-form";
import { api } from "./api";
import { Movie } from "./movies";

const directorsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDirectors: builder.query<Director[], void>({
      query: () => `/directors`,
    }),
    getDirector: builder.query<Director, number>({
      query: (id) => `/directors/${id}`,
    }),
    getDirectorMovies: builder.query<Movie[], number>({
      query: (id) => `/directors/${id}/movies`,
    }),
  }),
})

export enum Gender {
  "Femme" = 1,
  "Homme",
}

export type Director = {
  id: number;
  gender: Gender
  name: string;
  birthday: string;
  deathday: string;
  placeOfBirth: string;
  profilePath: string;
  biography: string;
}

export const { useGetDirectorsQuery, useGetDirectorQuery, useGetDirectorMoviesQuery } = directorsApi