import { api } from './api';
import { Gender } from './directors';

const charactersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCharacters: builder.query<Characters[], void>({
            query: () => '/characters',
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Characters' as const, id })), 'Characters']
                    : ['Characters'],
        }),
        getCharacter: builder.query<Characters, number>({
            query: (id) => `/characters/${id}`,
            providesTags: (result, error, id) => [{ type: 'Characters', id }],
        }),
        createCharacter: builder.mutation<Characters, Omit<Characters, "id">>({
            query: (body) => ({
                url: '/characters',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Characters'],
        }),
        updateCharacter: builder.mutation<Characters, { id: number, data: Partial<Omit<Characters, "id">> }>({
            query: ({ id, data }) => ({
                url: `/characters/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Characters', id }],
        }),
        deleteCharacter: builder.mutation<void, number>({
            query: (id) => ({
                url: `/characters/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Characters', id }],
        }),
    })
})

export type Characters = {
    id: number;
    gender: Gender
    name: string;
    order: number;
    profilePath: string;
    movie: number;
    actor: number;
}


export const { useGetCharactersQuery, useGetCharacterQuery, useCreateCharacterMutation, useUpdateCharacterMutation, useDeleteCharacterMutation } = charactersApi