import { api } from './api'
import type { Gender } from './directeur';

const enhancedApi = api.injectEndpoints({
  endpoints: (builder) => ({

  }),
})

export type Actors = {
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